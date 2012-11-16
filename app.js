var restify = require('restify');
var path = require('path');

var app = restify.createServer();
require(path.join(__dirname, 'initializers'))(app);
require(path.join(__dirname, 'middleware'))(app);
require(path.join(__dirname, 'routes'))(app);
//require(path.join(__dirname, 'websockets'))(app);

app.listen(app.port, function(){
 app.log.info("Application is running on port: %s", app.port);
});