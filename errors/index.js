var restify = require('restify');
var util = require('util');

function BadGatewayError(message) {
  restify.RestError.call(this, 502, "BadGatewayError", message, BadGatewayError);
  this.message = "Could not fulfil upstream request";
}
util.inherits(BadGatewayError, restify.RestError);

function InternalServerError(message) {
  restify.InternalError.call(this, 500, "InternalServerError", message, InternalServerError);
  this.message = "An error occurred on the server";
}
util.inherits(InternalServerError, restify.InternalError);

function ArgumentError(message) {
  restify.RestError.call(this, 400, "ArgumentError", message, ArgumentError);
  this.message = "Missing required paramter";
}
util.inherits(ArgumentError, restify.RestError);

function InvalidCredentialsError(message) {
  return new restify.InvalidCredentialsError(message);
}

function UnauthorizedError(message) {
  restify.RestError.call(this, 401, "UnauthorizedError", message, UnauthorizedError);
  this.message = "Unauthorized to perform the requested action";
}
util.inherits(UnauthorizedError, restify.RestError);

function NullDataStoreKeyError(message) {
  restify.RestError.call(this, 500, "NullDataStoreKeyError", message, NullDataStoreKeyError);
  this.message = "The requested key has a null value";
}
util.inherits(NullDataStoreKeyError, restify.RestError);

function DataStoreError(message) {
  restify.RestError.call(this, 500, "DataStoreError", message, DataStoreError);
  this.message = "An error occured accessing the Database";
}

util.inherits(DataStoreError, restify.RestError);

module.exports = {
  BadGatewayError        : BadGatewayError,
  InternalServerError    : InternalServerError,
  ArgumentError          : ArgumentError,
  InvalidCredentialsError: InvalidCredentialsError,
  UnauthorizedError      : UnauthorizedError,
  NullDataStoreKeyError  : NullDataStoreKeyError,
  DataStoreError         : DataStoreError
};