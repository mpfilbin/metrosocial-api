var path = require('path');
var nconf = require('nconf');
var restify = require('restify');
var moment = require('moment');

var Error = require(path.join(__dirname, '..', 'errors'));
var helpers = require(path.join(__dirname, '..', 'helpers'));

function PersonalHomeAPI() {
  this.submissionsService = nconf.get("SUBMISSION_FOR_REVIEW_SERVICE");
  this.dropboxService = nconf.get("DROPBOX_SUBMISSIONS_SERVICE");
  this.eventsService = nconf.get("UPCOMING_EVENTS_SERVICE");
}

PersonalHomeAPI.prototype.getSubmissions = function setSubmissions(authToken, callback) {
  if (!authToken) return callback(new Error.InvalidCredentialsError("Missing authentication token"));
  var client = helpers.createJSONClient(nconf.get("PERSONAL_HOME_HOST"), {"x-authorization": authToken});
  return client.get(this.dropboxService, helpers.handleResponse.bind(this, callback));
};

PersonalHomeAPI.prototype.getExams = function getExams(authToken, callback) {
  if (!authToken) return callback(new Error.InvalidCredentialsError("Missing authentication token"));
  var client = helpers.createJSONClient(nconf.get("PERSONAL_HOME_HOST"), {"x-authorization": authToken});
  return client.get(this.submissionsService, helpers.handleResponse.bind(this, callback));
};

PersonalHomeAPI.prototype.getEvents = function getEvents(authToken, callback) {
  var today = moment(new Date());
  var dateQueryString = "?from="+(today.format('M/D/YYYY'))+"&until="+(today.add("days", 7).format('M/D/YYYY'));
  if (!authToken) return callback(new Error.InvalidCredentialsError("Missing authentication token"));
  var client = helpers.createJSONClient(nconf.get("PERSONAL_HOME_HOST"), {"x-authorization": authToken});
  return client.get((this.eventsService + dateQueryString), helpers.handleResponse.bind(this, callback));
};


module.exports = PersonalHomeAPI;