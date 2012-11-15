var path = require('path');
var SessionsController = require(path.join(__dirname, '..', 'controllers', 'SessionsController'));
module.exports = function(app){
  var controller = new SessionsController();

  app.post('/sessions', controller.createNewSession.bind(controller));

  return app;
}