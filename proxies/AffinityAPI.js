var nconf = require('nconf');
var restify = require('restify');
var path = require('path');
var async = require('async');
var Errors = require(path.join('./', '..', 'errors'));

function AffinityAPI() {
  this.personalHomeHost = nconf.get("PERSONAL_HOME_HOST");
  this.personaHost = nconf.get('PERSONA_HOST');
  this.assertionPath = nconf.get("AFFINITY_ASSERTION_PATH");
  this.affinityService = nconf.get('AFFINITY_TOKEN_SERVICE');
}

AffinityAPI.prototype.getAffinityToken = function getAffinityToken(whittakerIDMToken, callback) {
  var authToken = whittakerIDMToken;
  var self = this;

  if (!authToken) return callback(new Errors.ArgumentError("Missing whittakerIDMToken"));

  async.waterfall([
    function (asyncCallback) {
      makeAffinityAssertion.call(self, authToken, asyncCallback);
    },
    function (assertions, asyncCallback) {
      getToken.call(self, assertions, asyncCallback);
    }
  ], callback);
};

function makeAffinityAssertion(authToken, callback) {
  var client = restify.createJsonClient({
    url    : this.personalHomeHost,
    headers: {
      "X-Authorization": ("Access_Token access_token=" + authToken)
    },
    retry  : {
      retries: 3
    }
  });

  client.get(this.assertionPath, assertionCallback);

  function assertionCallback(err, request, response, JSONPayload) {
    var error, assertionData;
    switch (true === true) {
      case err && err.message:
        error = new Errors.InternalServerError(err.message);
        break;
      case response && response.statusCode !== 200:
        error = new Errors.BadGatewayError("Request to: " + request.path + "failed");
        break;
      case JSONPayload && Object.keys(JSONPayload).length > 0:
        assertionData = JSONPayload;
        break;
      default:
        break;
    }

    callback(error, assertionData);
  }
}

function getToken(assertionData, callback) {
  var client = restify.createJsonClient({
    url  : this.personaHost,
    retry: {
      retries: 3
    }
  });

  var requestPath = [this.affinityService, assertionData.affinityAssertion.assertion].join('');
  client.get(requestPath, tokenCallback);

  function tokenCallback(err, request, response, JSONPayload) {
    var error, affinityToken;
    switch (true === true) {
      case err && err.message:
        error = new Errors.InternalServerError(err.message);
        break;
      case response && response.statusCode !== 200:
        error = new Errors.BadGatewayError("Request to: " + request.path + "failed");
        break;
      case JSONPayload && Object.keys(JSONPayload).length > 0:
        affinityToken = JSONPayload;
        break;
      default:
        break;
    }
    callback(error, affinityToken);
  }
}

module.exports = AffinityAPI;
