var path = require('path');
module.exports = function(app){
  require(path.join(__dirname, 'sessionsService'))(app);
  return app;
};