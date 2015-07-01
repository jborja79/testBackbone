define(["app", "apps/books/list/list_view"], function(booksManager, View){
  booksManager.module("booksApp.List", function(List, booksManager, Backbone, Marionette, $, _){
    List.Controller = {
      listBooks: function(criterion){
        require(["common/views", "entities/book"], function(CommonViews){
          var loadingView = new CommonViews.Loading();
          booksManager.regions.main.show(loadingView);

          var fetchingBooks = booksManager.request("book:entities",criterion);

          var booksListLayout = new View.Layout();
          var booksListPanel = new View.Panel({criterion:criterion});

          require(["entities/common"], function(FilteredCollection){
            $.when(fetchingBooks).done(function(books){
              var filteredBooks = booksManager.Entities.FilteredCollection({
                collection: books
              });

              var booksListView = new View.Books({
                collection: filteredBooks
              });


              booksListPanel.on("books:filter", function(filterCriterion){
                booksManager.trigger("books:filter", filterCriterion);
              });

              booksListLayout.on("show", function(){
                booksListLayout.panelRegion.show(booksListPanel);
                booksListLayout.booksRegion.show(booksListView);
              });

              booksListView.on("childview:books:details", function(childView, args){
                booksManager.trigger("book:show", args);
              });

              booksManager.regions.main.show(booksListLayout);
            });
          });
        });
      }
    }
  });

  return booksManager.booksApp.List.Controller;
});
