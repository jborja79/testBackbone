define(["app"], function(booksManager){
  booksManager.module("bookApp", function(booksApp, booksManager, Backbone, Marionette, $, _){
    booksApp.startWithParent = false;

    booksApp.onStart = function(){
      console.log("starting ContactsApp");
    };

    booksApp.onStop = function(){
      console.log("stopping ContactsApp");
    };
  });

  return booksManager.booksApp;
});
