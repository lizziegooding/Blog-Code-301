// Configure a view object, to hold all our functions for dynamic updates and article-related event handlers.
var articleView = {};

articleView.populateFilters = function() {
  $('article').each(function() {
    if (!$(this).hasClass('template')) {
      var val = $(this).find('address a').text();
      var optionTag = '<option value="' + val + '">' + val + '</option>';
      $('#author-filter').append(optionTag);

      val = $(this).attr('data-category');
      optionTag = '<option value="' + val + '">' + val + '</option>';
      if ($('#category-filter option[value="' + val + '"]').length === 0) {
        $('#category-filter').append(optionTag);
      }
    }
  });
};

articleView.handleAuthorFilter = function() {
  $('#author-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $('article[data-author="' + $(this).val() + '"]').fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#category-filter').val('');
  });
};

articleView.handleCategoryFilter = function() {
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $('article[data-category="' + $(this).val() + '"]').fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#author-filter').val('');
  });
};

articleView.handleMainNav = function() {
  $('.main-nav').on('click', '.tab', function(e) {
    $('.tab-content').hide();
    $('#' + $(this).data('content')).fadeIn();
  });

  $('.main-nav .tab:first').click(); // Let's now trigger a click on the first .tab element, to set up the page.
};

articleView.setTeasers = function() {
  $('.article-body *:nth-of-type(n+2)').hide(); // Hide elements beyond the first 2 in any artcile body.

  $('#articles').on('click', 'a.read-on', function(e) {
    e.preventDefault();
    $(this).parent().find('*').fadeIn();
    $(this).hide();
  });
};

articleView.initNewArticlePage = function() {
  console.log('initNewArticlePage function ran');
  // DONE: Ensure the main .tab-content area is revealed. We might add more tabs later.
  $('.tab-content').show();
  // TODO: The new articles we create will be copy/pasted into our source data file. Set up this "export" functionality. We can hide it for now, and show it once we have data to export.
  // DONE: Also, let's add focus event to help us select the JSON.
  $('#article-json').focus();
  // TODO: Add an event handler to update the preview and the export field if any inputs change.
  //Find article template
  var articleTemplate = $('#article-template').html();
  //Use handlebars built in function to compile template; what's returned is a function
  compiledTemplate = Handlebars.compile(articleTemplate);
  $('input, textarea').on('input', articleView.create);
};

articleView.create = function() {
  console.log('create function ran');
  // TODO: Set up a var to hold the new article we are creating.
  // Clear out the #articles element, so we can put in the updated preview
  var newArticle = {};
  $('#articles-preview').html('');

  // TODO: Instantiate an article based on what's in the form fields:
  newArticle.author = $('#article-author').val();
  newArticle.authorUrl = $('#article-author-url').val();
  newArticle.title = $('#article-title').val();
  newArticle.category = $('#article-category').val();
  newArticle.body = marked($('#article-body').val());
  newArticle.publishStatus = $('#article-published').val();
  if ($('#article-published:checked').length === 0){
    newArticle.publishStatus = 'draft';
    console.log('draft');
  }
  else {
    newArticle.publishStatus = 'published';
    console.log('published');
  }
  // console.log(newArticle);
  // TODO: Use our interface to the Handblebars template to put this new article into the DOM:
  // Pass the compiled template function the data object; returns a string of html
  var html = compiledTemplate(newArticle);
  $('#articles-preview').append(html);
  // myArticle = new Article(newArticle);
  // $('#articles-preview').append(myArticle.toHtml());
  //Push new article to the articles array defined in blogArticles.js

  // rawData.push(newArticle);

  // TODO: Activate the highlighting of any code blocks:
  //Find each <pre><code> tag in the output jQuery element

  // $('#articles-preview').find('pre code').each(function(i, block) {

    //Apply highlighting to each block it finds. Returns an object with language, relevance, value (HTML string), and top properties; value HTML string is then rendered in the DOM
    // hljs.highlightBlock(block); // Syntax-highlight each code block "in place"
  // });
  // TODO: Export the new article as JSON, so it's ready to copy/paste into blogArticles.js:
  // var mObj = {
  //   'm' : newArticle.body
  // };
  //
  // $('#article-json').val = JSON.stringify(mObj);
};

articleView.initIndexPage = function() {
  articleView.populateFilters();
  articleView.handleCategoryFilter();
  articleView.handleAuthorFilter();
  articleView.handleMainNav();
  articleView.setTeasers();
};
