var path = require('path');
var restify = require('restify');
var nconf = require('nconf');
var Errors = require(path.join(__dirname, '..', 'errors'));


function AuthenticationAPI() {
  this.authService = nconf.get("AUTH_SERVICE");
  this.client = restify.createJsonClient({
    url  : nconf.get("OPENCLASS_LOGIN_HOST"),
    retry: {
      retries: 3
    }
  });
}

AuthenticationAPI.prototype.getWhittakerIDMToken = function getWhittakerIDMToken(credentials, callback) {
  if (!credentials || !(credentials.email && credentials.password)) {
    return callback(new Errors.InvalidCredentialsError("Login credentials are invalid"));
  }
  this.client.post(this.authService, {email: credentials.email, password: credentials.password}, getAuthTokenCallback);

  function getAuthTokenCallback(err, request, response, JSONPayload) {
    var error, token;
    switch (true === true) {
      case err && err.message:
        error = new Errors.InternalServerError(err.message);
        break;
      case response && response.statusCode !== 200:
        error = new Errors.BadGatewayError("Request to: " + request.path + "failed");
        break;
      case JSONPayload && Object.keys(JSONPayload).length > 0:
        token = JSONPayload;
        break;
      default:
        break;
    }
    callback(error, token.data.authToken);
  }
};


module.exports = AuthenticationAPI;