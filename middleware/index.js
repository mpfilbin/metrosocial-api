var restify = require('restify');
var path = require('path');

module.exports = function(app){
  app.use(restify.acceptParser(app.acceptable));
  app.use(restify.queryParser());
  app.use(restify.bodyParser());
  app.use(restify.conditionalRequest());
  require(path.join(__dirname, 'patchHeaders'))(app);
  require(path.join(__dirname, 'cors'))(app);
  return app;
};