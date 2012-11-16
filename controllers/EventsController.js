var path = require('path');
var PersonalHomeAPI = require(path.join(__dirname, '..', 'proxies', 'PersonalHomeAPI'));
var helpers = require(path.join(__dirname, '..', 'helpers'));

function EventsController() {
  this.proxy = new PersonalHomeAPI();
}

EventsController.prototype.getEvents = function getEvents(request, response, next) {
  var authToken = helpers.getXAuthHeaders(request.headers);
  this.proxy.getEvents(authToken, getEventsCallback);

  function getEventsCallback(error, events) {
    if (error) {
      response.send(error);
    } else {
      response.send(200, events);
    }
    next();
  }
};

module.exports = EventsController;