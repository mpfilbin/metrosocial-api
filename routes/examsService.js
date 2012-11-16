var path = require('path');
var ExamsController = require(path.join(__dirname, '..', 'controllers', 'ExamsController'));

module.exports = function(app){
  var controller = new ExamsController();
  app.get("/exams", controller.getExams.bind(controller));
  return app;
};