var path = require('path');
var Errors = require(path.join(__dirname, '..', 'errors'));
var WebSocket = require('websocket-client').WebSocket;
var nconf = require('nconf');
var EventEmitter = require('events').EventEmitter;

module.exports = function (app) {
  var dataClient = app.redisClient;
  var subWayHost = nconf.get("SUBWAY_HOST");
  var socialStreamSvc = nconf.get("SOCIAL_STREAM_SERVICE");

//  dataClient.get('affinityToken', dataClientCallback);
//
//  function dataClientCallback(err, data) {
//    var error;
//    if (err) {
//      error = new Errors.InternalServerError(err.message);
//      app.logger.error(error);
//    } else if (!data) {
//      error = new Errors.NullDataStoreKeyError("No data is associated with key 'affinityToken'");
//      app.logger.error(error);
//    } else {
//      affinityToken = data;
//    }
//  }

  app.server.on('AffinityTokenReceived', openWebSocket.bind(this));
  function openWebSocket(affinityToken) {
    var webSocketUrl = [subWayHost, socialStreamSvc, ("?token=" + encodeURIComponent(affinityToken))].join('');
    // opts = (url, protocol, options);
    var socket = new WebSocket(webSocketUrl);
    socket.onMessage = function (msg) {
      dataClient.set('lastSocialStream', msg);
    }
  }


};