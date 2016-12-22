(function () {
'use strict';

angular.module('fishingApp', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: './app/home.html'
    })
    .state('fish', {
      url: '/fish',
      templateUrl: './app/admin/fish.html'
    })
    .state('venues', {
      url: '/venues',
      templateUrl: './app/admin/venues.html'
    })
    .state('sessions', {
      url: '/sessions',
      templateUrl: './app/admin/sessions.html'
    })

});

})();
