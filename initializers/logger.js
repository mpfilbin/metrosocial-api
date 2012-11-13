var bunyan = require('bunyan');
var nconf = require('nconf');

module.exports = function(app){
  app.log = bunyan.createLogger({
    name: nconf.get("APP_NAME")
  });
};