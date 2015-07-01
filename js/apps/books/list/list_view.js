define(["app",
        "hb!apps/books/list/templates/layout.handlebars",
        "hb!apps/books/list/templates/panel.handlebars",
        "hb!apps/books/list/templates/none.handlebars",
        "hb!apps/books/list/templates/list.handlebars",
        "hb!apps/books/list/templates/list_item.handlebars"],
       function(booksManager, layoutTpl, panelTpl, noneTpl, listTpl, listItemTpl){
  booksManager.module("booksApp.List.View", function(View, booksManager, Backbone, Marionette, $, _){
    View.Layout = Marionette.LayoutView.extend({
      template: layoutTpl,

      regions: {
        panelRegion: "#panel-region",
        booksRegion: "#books-region"
      }
    });

    View.Panel = Marionette.ItemView.extend({
      template: panelTpl,
      serializeData: function(){
        var searchParam =  (this.options.criterion)?this.options.criterion.replace("_", ""):'Backbone';
        return {criterion: searchParam};
      },
      events: {
        "submit #filter-form": "filterBooks"
      },

      ui: {
        criterion: "input.js-filter-criterion"
      },

      filterBooks: function(e){
        e.preventDefault();
        var criterion = this.$(".js-filter-criterion").val().replace( " ","_");
        this.trigger("books:filter", criterion);
      },

      onSetFilterCriterion: function(criterion){
        this.ui.criterion.val(criterion);
      }
    });

    View.Book = Marionette.ItemView.extend({
      tagName: "tr",
      template: listItemTpl,
      triggers: {
        "click a.js-details": "books:details",
        "click td a.js-show": "books:show",
        "click td a.js-edit": "books:edit",
        "click button.js-delete": "books:delete"
      },

      events: {
        "click": "highlightName"
      },

      flash: function(cssClass){
        var $view = this.$el;
        $view.hide().toggleClass(cssClass).fadeIn(800, function(){
          setTimeout(function(){
            $view.toggleClass(cssClass)
          }, 500);
        });
      },

      highlightName: function(e){
        this.$el.toggleClass("warning");
      },

      remove: function(){
        var self = this;
        this.$el.fadeOut(function(){
          Marionette.ItemView.prototype.remove.call(self);
        });
      }
    });

    var NoBooksView = Marionette.ItemView.extend({
      template: noneTpl,
      tagName: "tr",
      className: "alert"
    });

    View.Books = Marionette.CompositeView.extend({
      tagName: "table",
      className: "table table-hover",
      template: listTpl,
      emptyView: NoBooksView,
      childView: View.Book,
      childViewContainer: "tbody",

      initialize: function(){
        this.listenTo(this.collection, "reset", function(){
          this.attachHtml = function(collectionView, childView, index){
            collectionView.$el.append(childView.el);
          }
        });
      },

      onRenderCollection: function(){
        this.attachHtml = function(collectionView, childView, index){
          collectionView.$el.prepend(childView.el);
        }
      }
    });
  });

  return booksManager.booksApp.List.View;
});
