define(["app"], function(booksManager){
  booksManager.module("Entities", function(Entities, booksManager, Backbone, Marionette, $, _){


    Entities.Book = Backbone.Model.extend();

   // Entities.configureStorage("booksManager.Entities.Book", Entities.Book);

    Entities.BookCollection = Backbone.Collection.extend({
      url: function(){
        return "https://www.googleapis.com/books/v1/volumes?q="+this.models[0].attributes.criterion;
      },
      model: Entities.Book,
      comparator: "bookObject.title",
      parse: function (response){
        //Parse the response and construct models
      if(response.totalItems > 0){
        for (var i = 0, length = response.items.length; i < length; i++) {
          var bookObject = {};
          bookObject.id               = response.items[i].id;
          bookObject.title            = response.items[i].volumeInfo.title;
          bookObject.authors          = response.items[i].volumeInfo.authors;
          bookObject.description      = response.items[i].volumeInfo.description;
          bookObject.pageCount        = response.items[i].volumeInfo.pageCount;
          bookObject.categories       = response.items[i].volumeInfo.categories;
          if(response.items[i].volumeInfo.imageLinks){
            bookObject.smallThumbnail   = response.items[i].volumeInfo.imageLinks.smallThumbnail;
          }
          bookObject.language         = response.items[i].volumeInfo.language;
          bookObject.previewLink      = response.items[i].volumeInfo.previewLink;

          //push the model object
          this.push(bookObject);
          }
        }
        //return models
        return this.models;

      }
    });

   // Entities.configureStorage("booksManager.Entities.BookCollection", Entities.BookCollection);

    var initializeContacts = function(){
      var books = new Entities.BookCollection([
        { id: 1, firstName: "Alice", lastName: "Arten", phoneNumber: "555-0184" },
        { id: 2, firstName: "Bob", lastName: "Brigham", phoneNumber: "555-0163" },
        { id: 3, firstName: "Charlie", lastName: "Campbell", phoneNumber: "555-0129" }
      ]);
      books.forEach(function(book){
        book.save();
      });
      return books.models;
    };

    var API = {
      getBookEntities: function(criterion){
        var books = new Entities.BookCollection({criterion: criterion});
        var defer = $.Deferred();
        books.fetch({
          success: function(data){
            defer.resolve(data);
          }
        });
        var promise = defer.promise();
        $.when(promise).done(function(fetchedBooks){
          if(fetchedBooks.length === 0){
            // if we don't have any contacts yet, create some for convenience
            var models = initializeContacts();
            books.reset(models);
          }
        });
        return promise;
      },

      getContactEntity: function(contactId){
        var contact = new Entities.Contact({id: contactId});
        var defer = $.Deferred();
        setTimeout(function(){
          contact.fetch({
            success: function(data){
              defer.resolve(data);
            },
            error: function(data){
              defer.resolve(undefined);
            }
          });
        }, 2000);
        return defer.promise();
      }
    };

    booksManager.reqres.setHandler("book:entities", function(criterion){
      criterion = (criterion)?criterion:'backbone+js';
      return API.getBookEntities(criterion);
    });

    booksManager.reqres.setHandler("book:entity", function(id){
      return API.getContactEntity(id);
    });

    booksManager.reqres.setHandler("book:entity:new", function(id){
      return new Entities.Contact();
    });
  });

  return ;
});
