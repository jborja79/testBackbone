/*global define */

define([
  'backbone',
  'marionette',
  'jquery'
], function (Backbone, Marionette, $) {
  'use strict';
  var booksManager = new Marionette.Application();


  booksManager.navigate = function(route,  options){
    options || (options = {});
    Backbone.history.navigate(route, options);
  };

  booksManager.getCurrentRoute = function(){
    return Backbone.history.fragment
  };

  booksManager.startSubApp = function(appName, args){
      var currentApp = appName ? booksManager.module(appName) : null;
      if (booksManager.currentApp === currentApp){ return; }

      if (booksManager.currentApp){
        booksManager.currentApp.stop();
      }

      booksManager.currentApp = currentApp;
      if(currentApp){
        currentApp.start(args);
      }
    };


  booksManager.on("start", function(){
    var RegionContainer = Marionette.LayoutView.extend({
      el: "#app-container",
      regions: {
        header: "#header-region",
        main: "#main-region",
        dialog: "#dialog-region"
      }
    });

    booksManager.regions = new RegionContainer();


    booksManager.regions.dialog.onShow = function(view){
      var self = this;
      var closeDialog = function(){
        self.stopListening();
        self.empty();
        self.$el.dialog("destroy");
      };

      $('#modalBook').on('hidden.bs.modal', function () {
        window.history.back();
      });

      this.listenTo(view, "modal:close", closeDialog);
      var $modalEl = $("#modalBook");

      $('#dialog-region',$modalEl).html(view.el);
      $modalEl.modal();
    };


    if(Backbone.history){
      require(["apps/books/books_app"], function () {
        Backbone.history.start();
          booksManager.trigger("books:list");
      });
    }
  });
  return booksManager;
});