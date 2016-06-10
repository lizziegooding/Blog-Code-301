// Configure a view object, to hold all our functions for dynamic updates and article-related event handlers.
var articleView = {};
var $article = $('article');

//Create a function to populate filter options
articleView.populateFilters = function() {
  console.log('I called populateFilters');
  //For each article element in the page
  $article.each(function() {
    //for all articles but the class = template article
    if (!$(this).hasClass('template')) {
      // DONE: We need to take every author name from the page, and make it an option in the Author filter.
      //To do so, build an `option` DOM element that we can append to the author select box. Start by grabbing the author's name from `this` article element, and then use that bit of text to create the option tag (in a variable named `optionTag`), that we can append to the #author-filter select element.
      var val = $(this).find('address a').text();
      var optionTag = '<option value="' + val + '">' + val + '</option>';
      $('#author-filter').append(optionTag);

      // DONE: Similar to the above, but...
      //Avoid duplicates! We don't want to append the category name if the select already has this category as an option!
      val = $(this).attr('data-category');
      optionTag = '<option value="' + val + '">' + val + '</option>';
      //If the category filter value does not yet exist
      if ($('#category-filter option[value="' + val + '"]').length === 0) {
        $('#category-filter').append(optionTag);
      }
    }
  });
};

//Declare function handle author filter
articleView.handleAuthorFilter = function() {
  console.log('I called handleAuthorFilter');
  //Add event listener to author filter, when dropdown changes
  $('#author-filter').on('change', function() {
    if ($(this).val()) {
      // DONE: If the select box was changed to an option that has a value, we need to hide all the articles, and then show just the ones that match for the author that was selected. Use an "attribute selector" to find those articles, and fade them in for the reader.
      //Hide all articles
      $article.hide();
      //Only show the articles which have a data-author that matches the filtered value
      $article.filter('[data-author="' + $(this).val() + '"]').show();

    } else {
      // DONE: If the select box was changed to an option that is blank, we should show all the articles, except the one article we are using as a template.
      $article.filter("[class!='template']").show();
      console.log('Show all articles except the template');
    }
    //Make the other filter blank
    $('#category-filter').val('');
  });
};

// DONE: Just like we do for #author-filter above, we should handle change events on the #category-filter element. When an option with a value is selected, hide all the articles, then reveal the matches. When the blank (default) option is selected, show all the articles, except for the template. Be sure to reset the #author-filter while you are at it!

articleView.handleCategoryFilter = function() {
  console.log('I called handleCategoryFilter');
  //When category-filter form is changed...
  $('#category-filter').on('change', function() {
    //If the selected option's value exists
    if ($(this).val()) {
      //Hide all articles
      $article.hide();
      //Show only articles whos data category value matches the chose value from the drop down
      $article.filter('[data-category="' + $(this).val() + '"]').show();

    } else {
      // DONE: If the select box was changed to an option that is blank, we should show all the articles, except the one article we are using as a template.
      $article.filter("[class!='template']").show();
      console.log('Show all articles except the template');
    }
    //Make the other filter blank
    $('#author-filter').val('');
  });
};

//Declare function handleMainNav
articleView.handleMainNav = function() {
  console.log('I called handleMainNav');
  // DONE: Add an event handler to .main-nav element that will power the Tabs feature.
  //Clicking any .tab element should hide all the .tab-content sections, and then reveal the single .tab-content section that is associated with the clicked .tab element.
  //So: You need to dynamically build a selector string with the correct ID, based on the data available to you on the .tab element that was clicked.
  $('.main-nav .tab').on('click', function(){
    $('.tab-content').hide();
    //.tab-content ID matches the .tab data-content property
    $('#' + $(this).attr('data-content')).show();
  });

  $('.main-nav .tab:first').click(); // Let's now trigger a click on the first .tab element, to set up the page.
};

//Declare setTeasers function
articleView.setTeasers = function() {
  console.log('I called setTeasers');
  $('.article-body *:nth-of-type(n+2)').hide(); // Hide section child elements beyond the first 2 in any article body.
  //Add event listener to .read-on
  $('.read-on').on('click', function(e){
    //Prevent reload of page
    e.preventDefault();
    console.log($(this).prev());
    //Show all children elements of the clicked section readon
    $(this).prev().children().show();
    //Hide the read on
    $(this).hide();
  });

  // DONE: Add an event handler to reveal all the hidden elements, when the .read-on link is clicked. You can go ahead and hide the "Read On" link once it has been clicked. Be sure to prevent the default link-click action!
  //Ideally, we'd attach this as just 1 event handler on the #articles section, and let it process any .read-on clicks that happen within child nodes.

};

// DONE: Call all of the above functions, once we are sure the DOM is ready.
$(function(){
  articleView.populateFilters();
  articleView.handleAuthorFilter();
  articleView.handleCategoryFilter();
  articleView.handleMainNav();
  articleView.setTeasers();
});
