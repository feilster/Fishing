(function () {
'use strict';

angular.module('fishingApp', ['ui.router', 'ui.bootstrap', 'ngMessages'])

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
    .state('anglers', {
      url: '/anglers',
      component: 'adminAnglers'
    })
    .state('catches', {
      url: '/catches',
      component: 'pagesCatches'
    })
    .state('fish', {
      url: '/fish',
      component: 'adminFish'
    })
    .state('sessions', {
      url: '/sessions',
      component: 'pagesSessions'
    })
    .state('stats', {
      url: '/stats',
      component: 'pagesStats'
    })
    .state('venues', {
      url: '/venues',
      component: 'adminVenues'
    })

});

})();
