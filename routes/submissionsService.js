var path = require('path');
var SubmissionsController = require(path.join(__dirname, '..', 'controllers', 'SubmissionsController'));

module.exports = function(app){
  var controller = new SubmissionsController();
  app.get("/submissions", controller.getSubmissions.bind(controller));
  return app;
}