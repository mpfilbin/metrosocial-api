var path = require('path');
var AnnouncementsController = require(path.join(__dirname, '..', 'controllers', 'AnnouncementsController'));

module.exports = function(app){
  var controller = new AnnouncementsController();

  app.get("/announcements", controller.getAnnouncementsCollection.bind(controller));
};