var restifyDefaultResponseHeaders = null;
//============================================================================
// Workaround flaw in restify plugin
// Restify's default response headers is called just before send so any attempt
// to override the default headers overwritten with the defaults.  Make a copy
// of the function and overwrite it with one that adds our header.
//============================================================================

module.exports = function(app){
  app.pre(function(request, response, next){
    if (restifyDefaultResponseHeaders === null) {
      restifyDefaultResponseHeaders = response.defaultResponseHeaders;
    }
    response.defaultResponseHeaders = function (data) {
      restifyDefaultResponseHeaders.call(response, data);
      response.setHeader('Access-Control-Allow-Headers', 'Accept, Accept-Version, Content-Length, Content-MD5, ' +
        'Content-Type, Content-Range, Date, X-Api-Version, X-Authorization');
    };
    return next();
  })
}
