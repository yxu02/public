const mongoose = require("mongoose");
const redis = require("redis");
const util = require("util");

const redisUrl = "redis://127.0.0.1:6379";
const client = redis.createClient(redisUrl);

client.hget = util.promisify(client.hget);

mongoose.Query.prototype.cache = function (options = {}) {
  this.useCache = true;
  this.hashkey = JSON.stringify(options.key || '');
  return this;
}
//get a reference to the original prototype exec() in mongoose.Query class
const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.exec = async function() {
  // console.log(this.getQuery());
  // console.log(this.mongooseCollection.name);

  if (!this.useCache){
    return exec.apply(this, arguments);
  }
  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.mongooseCollection.name
    })
  );

  const cacheValue = await client.hget(this.hashkey, key);
  if (cacheValue) {
    // console.log(cacheValue);
    // const doc = new this.model(JSON.parse(cacheValue));
    // console.log(JSON.stringify(doc));
    // return doc;
    console.log("Retrieved from cache");
    const doc = JSON.parse(cacheValue);
    return Array.isArray(doc)
      ? doc.map(d => new this.model(d))
      : new this.model(doc);
  }
  const resultFromDB = await exec.apply(this, arguments); //mongoose.Query.exec required to return a promise
  client.hset(this.hashkey, key, JSON.stringify(resultFromDB));
  console.log('retrieved from DB');
  return resultFromDB;
};

const clearCache = (hashKey)=>{
  client.del(JSON.stringify(hashKey));
}

module.exports = {
  clearCache
}