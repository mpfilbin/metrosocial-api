var path = require('path');
var nconf = require('nconf');
var restify = require('restify');
var Errors = require(path.join(__dirname, '..', 'errors'));

function PersonalHomeAPI() {
  this.userAnnSvc = nconf.get("USER_ANNOUNCEMENTS_SERVICE");
  this.upcomingEvtSvc = nconf.get("UPCOMING_EVENTS_SERVICE");
  this.dropBoxForReviewSvc = nconf.get("DROPBOX_SUBMISSIONS_SERVICE");
}

PersonalHomeAPI.prototype.getAnnouncements = function getAnnouncements(authToken, callback) {
  if (!authToken) return callback(new Errors.InvalidCredentialsError("No authentication token was provided"));


  var client = restify.createJsonClient({
    url    : nconf.get("MAPI_HOST"),
    headers: {
      "X-Authorization": authToken
    },
    retry  : {
      retries: 3
    }
  });
  return client.get(this.userAnnSvc, handleResponse.bind(this, callback));
};

function handleResponse(callback, err, request, response, JSONPayLoad) {
  var error, data;
  switch (true === true) {
    case err && err.message:
      error = new Errors.InternalServerError(err.message);
      break;
    case response && response.statusCode !== 200:
      error = new Errors.BadGatewayError("Request to: " + request.path + "failed");
      break;
    case JSONPayLoad && Object.keys(JSONPayLoad).length > 0:
      data = JSONPayLoad;
      break;
    default:
      break;
  }
  callback(error, data);
}

module.exports = PersonalHomeAPI;

