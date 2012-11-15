var path = require('path');
var WSODAPI = require(path.join(__dirname, '..', 'proxies', 'WSODAPI'));

function AnnouncementsController(){
  this.proxy = new WSODAPI();
}

AnnouncementsController.prototype.getAnnouncementsCollection = function getAnnouncementsCollection(request, response, next){
  var authToken = request.headers['x-authorization'];
  this.proxy.getAnnouncements(authToken, getAnnCallBack);

  function getAnnCallBack(error, announcements){
    if(error){
     response.send(error)
    } else {
      response.send(200, announcements);
    }
    next();
  }
};


module.exports = AnnouncementsController;
