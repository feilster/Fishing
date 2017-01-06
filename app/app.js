(function () {
'use strict';

angular.module('fishingApp', ['ui.router', 'ngMessages'])

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: './app/home.html'
    })
    .state('fish', {
      url: '/fish',
      component: 'adminFish'
    })
    .state('venues', {
      url: '/venues',
      component: 'adminVenues'
    })
    .state('anglers', {
      url: '/anglers',
      component: 'adminAnglers'
    })
    .state('sessions', {
      url: '/sessions',
      component: 'pagesSessions'
    })
    .state('catches', {
      url: '/catches',
      component: 'pagesCatches'
    })

});

})();
