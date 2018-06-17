const {clearCache} = require('../services/cache');

//set up a middleware to automatically clear cache at http: post
module.exports = async (req, res, next)=>{
  await next();
  clearCache(req.user.id);
};