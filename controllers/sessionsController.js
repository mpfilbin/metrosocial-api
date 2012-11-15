var async = require('async');
var AffinityProxy = require('./../proxies/AffinityAPI.js');
var AuthenticationProxy = require('./../proxies/AuthenticationAPI.js');

function SessionsController() {
  this.affinityProxy = new AffinityProxy();
  this.authProxy = new AuthenticationProxy();
}

SessionsController.prototype.createNewSession = function createNewSession(request, response, next) {
  var self = this;
  var params = request.params;
  var credentials;
  var authToken;
  var affinityToken;

  if (params && (params.email && params.password)) {
    credentials = {
      email   : params.email,
      password: params.password
    };
  }

  async.waterfall([
    function (asyncCallback) {
      self.authProxy.getWhittakerIDMToken(credentials, asyncCallback);
    },
    function (token, asyncCallback) {
      authToken = "Access_Token access_token=" + token;
      self.affinityProxy.getAffinityToken(authToken, asyncCallback);
    }
  ], callback);

  function callback(error, data) {
    if (error) {
      response.send(error);
    } else {
      affinityToken = data;

      response.send(201, {token: authToken});
      next();
    }
  }
};

module.exports = SessionsController;