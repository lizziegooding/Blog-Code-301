(function(module) {
  var repos = {};

  repos.all = [];

  repos.requestRepos = function(callback) {
    // DONE: How would you like to fetch your repos? Don't forget to call the callback.
    // Hint: What did you learn on Day 6? Use the method that lets you send a HEAD
    $.getJSON('https://api.github.com/users/lizziegooding/repos', function(json){
      repos.all = json;
      console.log('Repos.all: ', repos.all);
      // var JSONmap = json.map(repoView.render);
      // console.log(JSONmap);
      callback();
    });
  };

  // DONE: Model method that filters the full collection for repos with a particular attribute.
  // You could use this to filter all repos that have a non-zero `forks_count`, `stargazers_count`, or `watchers_count`.
  repos.with = function(attr) {
    return repos.all.filter(function(repo) {
      return repo[attr];
    });
  };

  module.repos = repos;
})(window);
