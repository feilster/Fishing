(function () {
  'use strict';

  function PagesStatsController(StatsService, MessageService, $timeout) {

    var vm = this;

    vm.statsModel = StatsService;
    vm.messageModel = MessageService;

    // if empty list refresh from service
    if (!StatsService || !StatsService.anglerCatches || Object.keys(StatsService.anglerCatches).length==0) {
      StatsService.getAnglerCatches();
    }

    // if empty list refresh from service
    if (!StatsService || !StatsService.fishCatches || Object.keys(StatsService.fishCatches).length==0) {
      StatsService.getFishCatches();
    }

    vm.refreshAnglerCatches = function () {
      StatsService.getAnglerCatches();
      MessageService.successMessage = MessageService.refreshSuccess;
    }

    vm.refreshFishCatches = function () {
      StatsService.getFishCatches();
      MessageService.successMessage = MessageService.refreshSuccess;
    }

  }

  PagesStatsController.$inject = ['StatsService', 'MessageService', '$timeout'];

  angular.module('fishingApp')
  .component('pagesStats', {

    templateUrl: 'components/stats/stats.html',
    controller: PagesStatsController

  });

})();
