define(["app", "common/views", "hb!apps/books/details/templates/details.handlebars"], 
  function(booksManager, CommonViews, DetailsView){
  booksManager.module("booksApp.Details.View", function(View, booksManager, Backbone, Marionette, $, _){
    View.DetailsBook = Marionette.ItemView.extend({
      template: DetailsView,
      regions: {
        panelRegion: "#details-region"
      },
      serializeData: function(){
        // call the super method
        var data = Backbone.Marionette.ItemView.prototype.serializeData.apply(this, arguments);



        // send back your custom data
        return data;
      }
    });


    View.Book = Marionette.ItemView.extend({
      initialize: function(){
       // this.title = "Edit " + this.model.get("firstName") + " " + this.model.get("lastName");
      },

      onRender: function(){
        if(this.options.generateTitle){
          var $title = $("<h1>", { text: this.title });
          this.$el.prepend($title);
        }

        this.$(".js-submit").text("Update contact");
      }
    });
  });

  return booksManager.booksApp.Details.View;
});
