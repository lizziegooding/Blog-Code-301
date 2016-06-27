//On load (when url route extension = '/'), first call loadAll, which loads all articles, then call index, which displays all articles on the page
page('/',
  articlesController.loadAll,
  articlesController.index);

//Because of line 42 in index.html, when the user clicks the "About" nav item, the URL "end-bit" changes to '/about', and this line maps that URL to the callback aboutController.index, which causes GitHub repo info to be retrieved and displayed. This line's mapping connects the user action of "I click on 'About'" to the visual result of "I now see GitHub repo info."
page('/about', aboutController.index);

//When the user types in an id number after the /article/ extension, the loadById function is called, which only loads the article with the id specified, and then the loaded article is rendered using articlesController.index.
page('/article/:id',
  articlesController.loadById,
  articlesController.index);

// Redirect home if the default filter option is selected:
page('/category', '/');
page('/author', '/');

//If the user filters articles by authorName or types in the url extension /author/someAuthorName, call the loadByAuthor function, which loads all articles with the author name given in the extension, and then render them to the DOM using articlesController.index
page('/author/:authorName',
  articlesController.loadByAuthor,
  articlesController.index);

  //If the user filters articles by categoryName or types in the url extension /category/someCategory, call the loadByCategory function, which loads all articles with the category given in the extension, and then render them to the DOM using articlesController.index
page('/category/:categoryName',
  articlesController.loadByCategory,
  articlesController.index);

//Initialize routes
page();
