(function(module) {
  //Create an empty object repoView
  var repoView = {};
  //Declare a function ui
  var ui = function() {
    var $about = $('#about'); // Best practice: Cache the DOM query if it's used more than once.
    //find the <ul> tag within <about> and empty all it's child elements
    $about.find('ul').empty();
    //hide about and all its siblings
    $about.show().siblings().hide();
  };
  //Declare a function render
  var render = function(repo) {
    //return li element where it's inner html has an a tag with a link to the repo url and its text is the full name of the repo
    return $('<li>')
      .html('<a href="' + repo.html_url + '">' + repo.full_name + '</a>');
  };
  //Initialize the about page
  repoView.index = function() {
    ui();
    //to the #about ul element, append repos with the attribute forks_count, and then render each element
    $('#about ul').append(
      repos.with('forks_count').map(render)
    );
  };
  //set the passed parameter repoView method equal to the repoView object
  module.repoView = repoView;
  //Immediately invoke the declared function, passing in the window object instead of module.
})(window);
