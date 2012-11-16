var path = require('path');
var EventsController = require(path.join(__dirname, '..', 'controllers', 'EventsController'));
module.exports = function(app){
  var controller = new EventsController();
  app.get("/events/upcoming", controller.getEvents.bind(controller));
  return app;
};