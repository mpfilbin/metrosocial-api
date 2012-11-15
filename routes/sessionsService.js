var path = require('path');
var SessionsController = require(path.join('./', '..', 'controllers', 'SessionsController.js'));

module.exports = function(app){
  var controller = new SessionsController();

  app.post('/sessions', controller.createNewSession.bind(controller));

  return app;
}