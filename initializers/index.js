var path = require('path');

module.exports = function(app){
  app.env = process.env.NODE_ENV;
  require(path.join(__dirname, 'nconf'))(app);
  require(path.join(__dirname, 'logger'))(app);
  require(path.join(__dirname, 'application'))(app);
}