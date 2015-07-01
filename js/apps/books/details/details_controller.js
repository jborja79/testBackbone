define(["app", "apps/books/details/details_view"], function(booksManager, View){
  booksManager.module("booksApp.Details", function(Details, booksManager, Backbone, Marionette, $, _){
    Details.Controller = {
      detailBook: function(args){
        this.args = args;
        require(["common/views", "entities/book"], function(CommonViews){
          var loadingView = new CommonViews.Loading({
            title: this.args.model.get('title'),
            message: "Data loading is delayed to demonstrate using a loading view."
          });
          booksManager.regions.dialog.show(loadingView);

          var DetailsBook = new View.DetailsBook({
              model: this.args.model
          });
          booksManager.regions.dialog.show(DetailsBook);
        });
      }
    }
  });

  return booksManager.booksApp.Details.Controller;
});
