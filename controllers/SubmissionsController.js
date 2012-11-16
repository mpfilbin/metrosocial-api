var path = require('path');
var PersonalHomeAPI = require(path.join(__dirname, '..', 'proxies', 'PersonalHomeAPI'));
var helpers = require(path.join(__dirname, '..', 'helpers'));
function SubmissionsController(){
  this.proxy = new PersonalHomeAPI();
}

SubmissionsController.prototype.getSubmissions = function getSubmission(request, response, next){
  var authtoken = helpers.getxauthheaders(request.headers);
  this.proxy.getsubmissions(authtoken, getsubmissionscallback);

  function getsubmissionscallback(error, submissions){
    if(error){
      response.send(error);
    } else {
      response.send(200, submissions);
    }
    next();
  }
};

module.exports = SubmissionsController;