(function(module) {
  //Create an empty object repos
  var repos = {};
  //Define an empty array repos.all
  repos.all = [];
  //Create a method of the repos object called requestRepos
  repos.requestRepos = function(callback) {
    //Initialize an ajax call to the users git hub repo
    $.get('/github/user/repos' + '?per_page=100' + '&sort=updated')
    //once the call has completed successfully, call an anonymous function that assigns the returned data objects to the repos.all array
    .done(function(data, message, xhr) { repos.all = data; })
    //then, call the callback function specified as a parameter
    .done(callback);
  };
  //Create a .with method for the repos object which, given an attribute, filters the repos.all array and only returns the articles with the given attribute
  repos.with = function(attr) {
    return repos.all.filter(function(repo) { return repo[attr]; });
  };
  //set the passed parameter repos method equal to the repos object
  module.repos = repos;
  //Immediately invoke the declared function, passing in the window object instead of module.
})(window);
