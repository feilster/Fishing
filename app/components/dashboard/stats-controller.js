(function () {
  'use strict';

  angular.module('fishingApp')

  .controller('PagesDashboardController', function (StatsService, MessageService, $timeout) {

    var vm = this;

    vm.statsModel = StatsService;
    vm.messageModel = MessageService;

    vm.refreshStats = function (){
      CatchService.getCatches();
      MessageService.successMessage = MessageService.refreshSuccess;
    }

    vm.amountRange = [];
    vm.weightRange = [];

    vm.initAmountRange = function() {
      var i;
      for (i = 1;i <= 50; i++) {
        vm.amountRange.push(i);
      }
    }

    vm.initWeightRange = function() {
      var i;
      for (i = 0;i <= 400;) {
        i+=1;
        vm.weightRange.push(i/10);
      }
    }

    vm.initAmountRange();
    vm.initWeightRange();

    vm.setSelects = function(){
      if(vm.sessionModel.sessions){
        vm.catch.session = vm.sessionModel.sessions[0].id;
      }
      if(vm.anglerModel.anglers){
        vm.catch.angler = vm.anglerModel.anglers[0].id;
      }
      if(vm.fishModel.fishes){
        vm.catch.fish = vm.fishModel.fishes[0].code;
      }
      if(vm.initAmountRange){
        vm.catch.amount = vm.amountRange[0];
      }
      if(vm.initWeightRange){
        vm.catch.weight = vm.weightRange[0];
      }
    }

  });

})();
