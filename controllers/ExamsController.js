var path = require('path');
var PersonalHomeAPI = require(path.join(__dirname, '..', 'proxies', 'PersonalHomeAPI'));
var helpers = require(path.join(__dirname, '..', 'helpers'));
function ExamsController() {
  this.proxy = new PersonalHomeAPI();
}

ExamsController.prototype.getExams = function getExams(request, response, next) {
  var authtoken = helpers.getXAuthHeaders(request.headers);
  this.proxy.getExams(authtoken, getExamsCallback);

  function getExamsCallback(error, submissions) {
    if (error) {
      response.send(error);
    } else {
      response.send(200, submissions);
    }
    next();
  }
};

module.exports = ExamsController;