var path = require('path');
var nconf = require('nconf');
var restify = require('restify');
var Error = require(path.join(__dirname, '..', 'errors'));
var helpers = require(path.join(__dirname, '..', 'helpers'));

function PersonalHomeAPI(){
  this.submissionsService = nconf.get("SUBMISSION_FOR_REVIEW_SERVICE");
  this.dropboxService = nconf.get("DROPBOX_SUBMISSIONS_SERVICE");
  this.eventsService = nconf.get("UPCOMING_EVENTS_SERVICE");
}

PersonalHomeAPI.prototype.getSubmissions = function setSubmissions(authToken, callback){
  if(!authToken) return callback(new Error.InvalidCredentialsError("Missing authentication token"));
  var client = helpers.createJSONClient(nconf.get("PERSONAL_HOME_HOST"), {"x-authorization": authToken});
  return client.get(this.dropboxService, helpers.handleResponse.bind(this, callback))
};


module.exports = PersonalHomeAPI;