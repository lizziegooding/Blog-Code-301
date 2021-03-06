// DONE: Wrap the entire contents of this file in an IIFE.
// Pass in to the IIFE a module, upon which objects can be attached for later access.
(function(module) {
  function Article (opts) {
    this.author = opts.author;
    this.authorUrl = opts.authorUrl;
    this.title = opts.title;
    this.category = opts.category;
    this.body = opts.body;
    this.publishedOn = opts.publishedOn;
  }

  Article.all = [];

  Article.prototype.toHtml = function() {
    var template = Handlebars.compile($('#article-template').text());

    this.daysAgo = parseInt((new Date() - new Date(this.publishedOn)) / 60 / 60 / 24 / 1000);
    this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
    this.body = marked(this.body);

    return template(this);
  };

  Article.loadAll = function(rawData) {
    rawData.sort(function(a,b) {
      return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
    });

    // DONE: Refactor this forEach code, by using a `.map` call instead, since what we are
    // trying to accomplish is the transformation of one colleciton into another.

    // rawData.forEach(function(ele) {
    //   Article.all.push(new Article(ele));
    // })
    Article.all = rawData.map(function(ele) {
      return new Article(ele);
    });
  };

  // This function will retrieve the data from either a local or remote source,
  // and process it, then hand off control to the View.

  // DONE: Refactor this function, and provide it with a parameter of a callback function
  //(for now just a placeholder, but to be referenced at call time as a view function)
  // to execute once the loading of articles is done. We do this because we might want
  // to call other view functions, and not just the initIndexPage() that we are replacing.
  // Now, instead of calling articleView.initIndexPage(), we can simply run our callback.
  Article.fetchAll = function(a) {
    if (localStorage.rawData) {
      Article.loadAll(JSON.parse(localStorage.rawData));
      a();
    } else {
      $.getJSON('/data/hackerIpsum.json', function(rawData) {
        Article.loadAll(rawData);
        localStorage.rawData = JSON.stringify(rawData); // Cache the json, so we don't need to request it next time.
        a();
      });
    }
  };

  // DONE: Chain together a `map` and a `reduce` call to get a rough count of all words in all articles.
  Article.numWordsAll = function() {
    return Article.all.map(function(article) {
      // console.log(Article.all.body.split(' ').length);
      return article.body.split(' ').length; // Grab the words from the `article` `body`.
    })
    .reduce(function(a, b) {
      return a + b;// Sum up all the values!
    });
  };

  // DONE: Chain together a `map` and a `reduce` call to produce an array of unique author names.
  Article.allAuthors = function() {
    // Read docs on .map and .reduce! You can reference the previous
    // `map` in the numWordsAll method to get started here.

    // For our `reduce` -- since we are trying to return an array, we'll need to specify an accumulator type...
    // what data type should this accumulator be and where is it placed?

    return Article.all.map(function(article) {
      return article.author;
    })
    .reduce(function(p, c) {
      if (p.indexOf(c) < 0) p.push(c);
      return p;
    }, []);
  };

  Article.numWordsByAuthor = function() {
    // DONE: Transform each author string into an object with 2 properties: One for
    // the author's name, and one for the total number of words across the matching articles
    // written by the specified author.
    return Article.allAuthors().map(function(author) {
      //   console.log(Article.all
      //     .filter(function(obj) {
      //       return obj.author === author;
      //     })
      //     .map(function(obj) {
      //       return obj.body;
      //     })
      //     .map(function(ele) {
      //       return ele.split(' ').length;
      //     })
      //     .reduce(function(a, b) {
      //       return a + b;
      //     })
      // );
      return {
        name: author,
        numWords: Article.all
            .filter(function(obj) {
              // console.log(obj);
              return obj.author === author;
            })
            .map(function(obj) {
              // console.log(obj.body.split(' '));
              return obj.body.split(' ').length;
            })
            // .map(function(ele) {
            //   return ele.split(' ').length;
            // })
            .reduce(function(a, b) {
              return a + b;
            }),
      };
    }); // someCollection.someArrayMethod().map(...).reduce(...), ...
  };
  module.Article = Article;
})(window);
