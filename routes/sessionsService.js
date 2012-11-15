var path = require('path');
var SessionsController = require('./../controllers/sessionsController.js');

module.exports = function(app){
  var controller = new SessionsController();

  app.post('/sessions', controller.createNewSession.bind(controller));

  return app;
}