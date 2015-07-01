define(["app"], function(booksManager){
  booksManager.module("Routers.bookApp", function(BooksAppRouter, booksManager, Backbone, Marionette, $, _){
    BooksAppRouter.Router = Marionette.AppRouter.extend();

    booksManager.on("books:list", function(){
      booksManager.navigate("books/backbone");
      API.listBooks();
    });

    var executeAction = function(action, arg){
      booksManager.startSubApp("booksApp");
      action(arg);
      booksManager.execute("set:active:header", "books");
    };

    var API = {
      listBooks: function(criterion){
        require(["apps/books/list/list_controller"], function(ListController){
          executeAction(ListController.listBooks, criterion);
        });
      },

      showBook: function(args){
        require(["apps/books/details/details_controller"], function(DetailsController){
          executeAction(DetailsController.detailBook, args);
        });
      }
    };


    booksManager.on("book:show", function(args){
      booksManager.navigate("book/" + booksManager.getCurrentRoute().split('/')[1] + "/" + args.model.get('title').replace( " ","_"));
      API.showBook(args);
    });


   booksManager.on("books:filter", function(criterion){
    console.log(criterion);
      if(criterion){
        booksManager.navigate("books/"+ criterion);
      }
      else{
        booksManager.navigate("books");
      }
      API.listBooks(criterion);
    });


    booksManager.Routers.on("start", function(){
      new BooksAppRouter.Router({
        controller: API
      });
    });
  });

  return booksManager.BooksAppRouter;
});
