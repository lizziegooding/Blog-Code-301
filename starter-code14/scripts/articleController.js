(function(module) {
  var articlesController = {};

  Article.createTable();  // Ensure the database table is properly initialized

  articlesController.index = function(ctx, next) {
    articleView.index(ctx.articles);
  };

  // Comment: What does this method do?  What is it's execution path?
  //Article.findWhere runs first and queries the source data via SQL where the article object has the id given after the /articles/ path. ctx.params.id is set equal to the id given after /articles/ in the path. Next, articleData runs and sets the ctx article property equal to the article object. Finally, it runs a function next() given as an argument
  articlesController.loadById = function(ctx, next) {
    var articleData = function(article) {
      ctx.articles = article;
      //In routes.js, next() calls articlesController.index, a view function
      next();
    };
    Article.findWhere('id', ctx.params.id, articleData);
  };

  // Comment: What does this method do?  What is it's execution path?
  //Article.findWhere runs first and queries the source data via SQL where the article object has the author given after the /articles/author/ path. ctx.params.authorName is set equal to the author name given after /articles/ in the path. Next, articleData runs and sets the ctx articles property equal to the articlesByAuthor array. Finally, it runs a function next() given as an argument
  articlesController.loadByAuthor = function(ctx, next) {
    var authorData = function(articlesByAuthor) {
      ctx.articles = articlesByAuthor;
      next();
    };

    Article.findWhere('author', ctx.params.authorName.replace('+', ' '), authorData);
  };

  // Comment: What does this method do?  What is it's execution path?
  //Article.findWhere runs first and queries the source data via SQL where the article object has the category given after the /articles/category/ path. ctx.params.categoryName is set equal to the category name given after /category/ in the path. Next, articleData runs and sets the ctx articles property equal to the articlesInCategory array. Finally, it runs a function next() given as an argument

  articlesController.loadByCategory = function(ctx, next) {
    var categoryData = function(articlesInCategory) {
      ctx.articles = articlesInCategory;
      next();
    };

    Article.findWhere('category', ctx.params.categoryName, categoryData);
  };

  // Comment: What does this method do?  What is it's execution path?
  //Runs when the home page is loaded. If there are articles, ctx.articles is set equal to all articles and the next() function is called. Otherwise, all articles are first fetched, the ctx articles property is set equal to all articles, and then the next() function is called.
  articlesController.loadAll = function(ctx, next) {
    var articleData = function(allArticles) {
      ctx.articles = Article.all;
      next();
    };

    if (Article.all.length) {
      ctx.articles = Article.all;
      next();
    } else {
      Article.fetchAll(articleData);
    }
  };

  module.articlesController = articlesController;
})(window);
