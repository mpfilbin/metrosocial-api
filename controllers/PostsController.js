var path = require('path');
var Errors = require(path.join(__dirname, '..', 'errors'));
var Data = require(path.join(__dirname, '..', 'test', 'fixtures','postsFixture'));
var _ = require('underscore');

function PostsController() {
  this.data = _.clone(Data);
}

PostsController.prototype.getPosts = function getPosts(request, response, next) {
  var result = getData.call(this);
  response.send(200, result);
  next();
//  this.client.get('lastSocialStream', getSocialStreamCallback);

//  function getSocialStreamCallback(err, data) {
//    if (err) {
//      response.send(new Errors.InternalServerError(err.message));
//    } else {
//      response.send(200, data);
//    }
//    next();
//  }

};

function getData(){
  if (this.data && this.data.length > 0){
    return this.data.pop();
  } else {
    return {}
  }
}
module.exports = PostsController;