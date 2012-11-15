var path = require('path');
module.exports = function(app){
  require('./sessionsService.js')(app);
  return app;
};