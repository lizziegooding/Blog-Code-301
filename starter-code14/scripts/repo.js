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
    //then, call the callback function specified as a parameter-- in total, 2 done callbacks are called. This order never changes.
    .done(callback);
  };
  //$.get(), $.getJSON(), and $.ajax() all retrieve data using an AJAX call. They differ in their specificity; $.getJSON is the simplest call and comes with preset assumptions, including that the data it is retrieving is in JSON format. $.get() is more customizable and doesn't assume the data comes in JSON format. $.ajax() is the most customizable and takes an object with necessary parameters as an argument as opposed to just parameter arguments.
  //No callbacks would run if AJAX was unable to retreive data from the server

  //Create a .with method for the repos object which, given an attribute, filters the repos.all array and only returns the articles with the given attribute
  repos.with = function(attr) {
    return repos.all.filter(function(repo) { return repo[attr]; });
  };

  // repos.all is an array of article objects
  // .filter() takes a function as an argument and returns an array that meets the requirements specified in the function. In this case, filter will return an array of objects which contain the attr parameter as an attribute
  // The anonymous function's param repo refers to each element within the repos.all array

  //set the passed parameter repos method equal to the repos object
  module.repos = repos;
  //Immediately invoke the declared function, passing in the window object instead of module.
})(window);
