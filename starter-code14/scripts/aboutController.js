(function(module) {
  //Declare an empty object aboutController
  var aboutController = {};
  //Declare a method of aboutController object call index
  aboutController.index = function() {
    //call the requestRepos method passing in the repoView.index function
    //This will first use AJAX to retreive the data, then once it's been successfully retreivied, call the repoView.index function which will then render the retreived repos to the DOM
    repos.requestRepos(repoView.index);
  };
  //set the passed parameter repoView method equal to the repoView object
  module.aboutController = aboutController;
  //Immediately invoke the declared function, passing in the window object instead of module.
})(window);
