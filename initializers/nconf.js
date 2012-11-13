var fileSystem = require('fs');
var path = require('path');
var nconf = require('nconf');

module.exports = function (app) {
  var defaultConfig = path.join(__dirname, '..', 'config', 'default.json');
  var environmentalConfig = path.join(__dirname, '..', 'config', (app.env + ".json"));
  try {
    fileSystem.statSync(defaultConfig);
    fileSystem.statSync(environmentalConfig);
    var data = fileSystem.readFileSync(defaultConfig, 'utf8');

    nconf.argv()
      .env()
      .defaults(JSON.parse(data.toString()))
      .file(environmentalConfig);
  } catch (error) {
    app.log && app.log.error(error);
  }
};