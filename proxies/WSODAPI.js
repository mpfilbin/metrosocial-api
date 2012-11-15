var path = require('path');
var nconf = require('nconf');
var restify = require('restify');
var Errors = require(path.join(__dirname, '..', 'errors'));
var helpers = require(path.join(__dirname, '..', 'helpers'));

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
  return client.get(this.userAnnSvc, helpers.handleResponse.bind(this, callback));
};

module.exports = PersonalHomeAPI;

