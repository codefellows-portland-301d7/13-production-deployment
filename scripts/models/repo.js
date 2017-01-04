(function(module) {
  var reposObj = {};

  reposObj.allRepos = [];

  reposObj.requestRepos = function(callback) {
    $.get('/github/user/repos' + //users/repos is the authenticated version
          '?per_page=10&sort=updated')
          .done(function(data) {
            reposObj.allRepos = data;
            $.get('/github/user/followers') // second ajax call
            .done(function(data) {
              reposObj.followers = data;
            })
            .done(callback); // the callback will be the renderRepos
          });
  };

  reposObj.withTheAttribute = function(attr) {
    return reposObj.allRepos.filter(function(aRepo) {
      return aRepo[attr];
    });
  };

  reposObj.followers = [];

  module.reposObj = reposObj;
})(window);
