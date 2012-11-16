var path = require('path');
var PostsController = require(path.join(__dirname, '..', 'controllers', 'PostsController'));
module.exports = function (app) {
  var controller = new PostsController(app.redisClient);

  app.get('/posts', controller.getPosts.bind(controller));
  return app;

};