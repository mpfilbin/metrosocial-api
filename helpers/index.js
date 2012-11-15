var path = require('path');
var restify = require('restify');
var Errors = require(path.join(__dirname, '..', 'errors'));

function handleResponse(callback, err, request, response, JSONPayLoad) {
  var error, data;
  switch (true === true) {
    case err && err.message:
      error = new Errors.InternalServerError(err.message);
      break;
    case response && response.statusCode > 300:
      error = new Errors.UnauthorizedError("Unauthorized to perform this action on the server");
      break;
    case response && response.statusCode !== 200:
      error = new Errors.BadGatewayError("Request to: " + request.path + " failed");
      break;
    case JSONPayLoad && Object.keys(JSONPayLoad).length > 0:
      data = JSONPayLoad;
      break;
    default:
      break;
  }
  callback(error, data);
}

function createJSONClient(url, headers, retries) {
  return restify.createJsonClient({
    url    : url,
    headers: headers,
    retry  : {
      retries: (retries || 3)
    }
  });
}

function getXAuthHeaders(headers) {
  return headers['x-authorization'];
}
module.exports = {
  handleResponse  : handleResponse,
  createJSONClient: createJSONClient,
  getXAuthHeaders : getXAuthHeaders
};