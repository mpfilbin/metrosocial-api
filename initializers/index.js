var path = require('path');

module.exports = function(app){
  app.env = process.env.NODE_ENV;
  require('./nconf.js')(app);
  require('./logger.js')(app);
  require('./application.js')(app);
};