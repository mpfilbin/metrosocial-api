var nconf = require('nconf');


module.exports = function(app){
  app.name = nconf.get('APP_NAME');
  app.version = nconf.get('APP_VERSION');
  app.acceptable = nconf.get('APP_MIMETYPES');
  app.port = nconf.get('SERVER_PORT');
  return app;
};