const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const clearCache = require('../middlewares/clearCache');

const Blog = mongoose.model("Blog");

module.exports = app => {
  app.get("/api/blogs/:id", requireLogin, async (req, res) => {
    const blog = await Blog.findOne({
      _user: req.user.id,
      _id: req.params.id
    });

    res.send(blog);
  });

  app.get("/api/blogs", requireLogin, async (req, res) => {
    // /* rudimentary use of redis cache. Some problems: 1. code too long to apply every time in need for caching
    // 2. cache no exp; 3. cache doesn't apply to similar but slightly different queries
    //  */
    // const redis = require('redis');
    // const redisUrl = 'redis://127.0.0.1:6379';
    // const client = redis.createClient(redisUrl);
    // const util = require('util');
    // //'util' has a function to promisify functions with callbacks
    // client.get = util.promisify(client.get);
    //
    // //look up into redis first to see if there are already any matching cached results
    // //if yes, fetch from cache
    // //now client.get() return a promise instead of a callback thanks to util.promisify()
    // const cachedBlogs = await client.get(req.user.id);
    //
    // if (cachedBlogs){
    //   console.log('SERVING FROM CACHE');
    //   return res.send(JSON.parse(cachedBlogs));
    // }
    // //if no, fetch from MongoDB and update cache
    const blogs = await Blog.find({ _user: req.user.id }).cache({
      key: req.user.id
    });
    res.send(blogs);
    // client.set(req.user.id, JSON.stringify(blogs));
  });

  app.post("/api/blogs", requireLogin, clearCache, async (req, res) => {
    const { title, content, imageUrl } = req.body;

    const blog = new Blog({
      imageUrl,
      title,
      content,
      _user: req.user.id
    });

    try {
      await blog.save();
      res.send(blog);
    } catch (err) {
      res.send(400, err);
    }

    // //this is one way to clear cache with custom functions defined in cache.js
    // clearCache(req.user.id);
  });
};
