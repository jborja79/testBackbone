require.config({
  paths: {
    underscore: '../bower_components/underscore/underscore',
    backbone: '../bower_components/backbone/backbone',
    marionette: '../bower_components/backbone.marionette/lib/backbone.marionette',
    jquery: '../bower_components/jquery/dist/jquery',
    localStorage: '../bower_components/backbone.localStorage/backbone.localStorage',
    handlebars: '../bower_components/handlebars/handlebars',
    bootstrap: 'lib/bootstrap.min',
    spin: "lib/spin",
    "spin.jquery": "lib/spin.jquery",
    text: "../bower_components/text/text",
    hb: "../bower_components/requirejs-handlebars/hb"
  },

  shim: {
    handlebars: {
      exports: 'Handlebars'
    },
    underscore: {
      exports: '_'
    },

    backbone: {
      exports: 'Backbone',
      deps: ['jquery', 'underscore']
    },

    marionette: {
      exports: 'Backbone.Marionette',
      deps: ['backbone']
    },

    bootstrap: {
        deps: ['jquery']
    },

    "spin.jquery": ["spin", "jquery"]
  },
    waitSeconds: 60
});

require([
  'app',
  'jquery',
  'bootstrap',
  'apps/books/books_app_router'
], function (bookManager) {
  'use strict';
  bookManager.start();
});