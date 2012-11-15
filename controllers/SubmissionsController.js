var path = require('path');
var PersonalHomeAPI = require(path.join(__dirname, '..', 'proxies', 'PersonalHomeAPI'));
var helpers = require(path.join(__dirname, '..', 'helpers'));
function SubmissionsController(){
  this.proxy = new PersonalHomeAPI();
}

SubmissionsController.prototype.getSubmissions = function getSubmission(request, response, next){
  var authToken = helpers.getXAuthHeaders(request.headers);
  this.proxy.getSubmissions(authToken, getSubmissionsCallback);

  function getSubmissionsCallback(error, submissions){
    if(error){
      response.send(error);
    } else {
      response.send(200, submissions);
    }
    next();
  }
};

module.exports = SubmissionsController;