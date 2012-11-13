module.exports = function (app) {
  app.use(allowCORS());

  function allowCORS() {
    return function (request, response, next) {
      response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
      // Intercept OPTIONS pre-flight check
      if (request.method === 'OPTIONS') {
        response.send(200);
      } else {
        next();
      }
    }
  }
};