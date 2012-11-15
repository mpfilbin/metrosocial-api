var path = require('path');
module.exports = function(app){
  require(path.join(__dirname, 'sessionsService'))(app);
  require(path.join(__dirname, 'announcementsService'))(app);
  return app;
};