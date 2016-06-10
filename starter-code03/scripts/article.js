//Create an empty array to store article objects
var articles = [];

//Object constructor for article objects
function Article (opts) {
  this.author = opts.author;
  this.authorUrl = opts.authorUrl;
  this.title = opts.title;
  this.category = opts.category;
  this.body = opts.body;
  this.publishedOn = opts.publishedOn;
}

//Add a method to all objects called 'toHtml'
Article.prototype.toHtml = function() {
  //clone the article template in the DOM
  var $newArticle = $('article.template').clone();
  //Remove the class template from the clone
  $newArticle.removeClass('template');
  //If the article does not have a publishedOn date, add class 'draft' to the cloned article
  if (!this.publishedOn) {
    $newArticle.addClass('draft');
  }
  //Add new attribute data-category to the cloned article corresponding to the category stored in the article object
  $newArticle.attr('data-category', this.category);
  //DONE Use jQuery to also add the author name as a data-attribute of the newly cloned article. Doing so will allow us to use selectors to target articles, based on who wrote them.
  $newArticle.attr('data-author', this.author);

  //Navigate the cloned HTML to write article object properties to the html
  $newArticle.find('.byline a').html(this.author);
  $newArticle.find('.byline a').attr('href', this.authorUrl);
  $newArticle.find('h1:first').html(this.title);
  $newArticle.find('.article-body').html(this.body);
  $newArticle.find('time[pubdate]').attr('datetime', this.publishedOn);
  $newArticle.find('time[pubdate]').attr('title', this.publishedOn);
  //Calculate how many days ago the article was published
  $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn)) / 60 / 60 / 24 / 1000) + ' days ago');
  //Append a horizontal rule to separate articles
  $newArticle.append('<hr>');
  //Return the newly constructed html tree
  return $newArticle;
};

//Sort the rawData array in ascending order, most recent articles first
rawData.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

//From MDN: forEach() executes the provided callback once for each element present in the array in ascending order. In this case, for each object in the array rawData (from our other js file) the forEach will call the object constructor function and push said object into the new array articles
rawData.forEach(function(ele) {
  articles.push(new Article(ele));
});

//For each object in the array articles, the forEach will call the toHtml function, which will create the fill in the HTML tree fragment, and then append it to the DOM
articles.forEach(function(a){
  $('#articles').append(a.toHtml());
});
