var articles = [];

function Article (opts) {
  // DONE: Use the js object passed in to complete this contructor function:
  // Save ALL the properties of `opts` into `this`.
  this.title = opts.title;
  this.category = opts.category;
  this.author = opts.author;
  this.authorUrl = opts.authorUrl;
  this.publishedOn = opts.publishedOn;
  this.body = opts.body;
}
// var template =
Article.prototype.toHtml = function() { //creates a new method toHtml for all article objs
  var $newArticle = $('article.template').clone(); //clones articles and all descendants within HTML

  // DONE: This cloned article is no longer a template, so we should remove that class...
  $newArticle.removeClass('template');
  $newArticle.attr('data-category', this.category); //assigns clone a custon attribute of data-category and assigns

  // DONE: Use jQuery to fill in the template with properties
  // from this particular Article instance. We need to fill in:
  // the author name and url, the article title and body, and the
  // publication date.
  $newArticle.find('h1').text(this.title);
  console.log('find method worked');
  $newArticle.find('a').text(this.author);
  $newArticle.find('a').attr('href', this.authorUrl);
  $newArticle.find('section.article-body').html(this.body);
  //Include the publication date as a 'title' attribute to show on hover:
  $newArticle.find('time[pubdate]').attr('title', this.publishedOn);

  // Display the date as a relative number of "days ago":
  $newArticle.find('time').text('about ' + parseInt((new Date() - new Date(this.publishedOn)) / 60 / 60 / 24 / 1000) + ' days ago');

  $newArticle.append('<hr>');
  return $newArticle;
};

rawData.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

rawData.forEach(function(ele) {
  articles.push(new Article(ele));
});
debugger;
articles.forEach(function(a){
  $('#articles').append(a.toHtml());
  console.log(a.toHtml().html());
});
