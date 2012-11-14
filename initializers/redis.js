var redis = require('redis');
var url = require('url');

module.exports = function(app){
  var redisHost = url.parse(process.env.REDISTOGO_URL);
  var client = redis.createClient(redisHost.port, (redisHost.host || redisHost.hostname));

  client.auth(redisHost.auth.split(":")[0]);
  app.redisClient = client;
  return app;
};