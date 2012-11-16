var path = require('path');
module.exports = function(app){
  require(path.join(__dirname, 'sessionsService'))(app);
  require(path.join(__dirname, 'announcementsService'))(app);
  require(path.join(__dirname, 'submissionsService'))(app);
  require(path.join(__dirname, 'examsService'))(app);
  require(path.join(__dirname, 'eventsService'))(app);
  require(path.join(__dirname, 'postsService'))(app);
  return app;
};