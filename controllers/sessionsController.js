var path = require('path');
var async = require('async');
var AffinityProxy = require(path.join('./../proxies/AffinityAPI.js'));
var AuthenticationProxy = require(path.join('./../proxies/AuthenticationAPI.js'));

function SessionsController() {
  this.affinityProxy = new AffinityProxy();
  this.authProxy = new AuthenticationProxy();
};

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
      authToken = token;
      self.affinityProxy.getAffinityToken(authToken, asyncCallback);
    }
  ], callback);

  function callback(error, data) {
    if (error) {
      response.send(error);
    } else {
      affinityToken = data;
      response.send(201, authToken);
    }
    // Do something with data
  }
};

module.exports = SessionsController;