var redis = require('redis');
var url = require('url');
var nconf = require('nconf');

module.exports = function(app){
  var redisHost = url.parse((process.env.REDISTOGO_URL || nconf.get("REDIS_SERVER")));
  var client = redis.createClient(redisHost.port, (redisHost.host || redisHost.hostname));

  if(redisHost.auth) client.auth(redisHost.auth.split(":")[0]);
  app.redisClient = client;
  return app;
};