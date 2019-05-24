(function () {
  'use strict';

  function PagesCatchesController(CatchService, SessionService, AnglerService, FishService, MessageService, $timeout) {

    var vm = this;

    vm.catch = {id: null, session: null, angler: null, fish: null, weight: null, amount: null};

    vm.catchModel = CatchService;
    vm.sessionModel = SessionService;
    vm.anglerModel = AnglerService;
    vm.fishModel = FishService;
    vm.messageModel = MessageService;

// if empty list refresh from service
    if (!CatchService || !CatchService.catches || Object.keys(CatchService.catches).length==0) {
      CatchService.getCatches();
    }
    // if empty list refresh from service
    if (Object.keys(SessionService.sessions).length==0) {
      SessionService.getSessions();
    }
    // if empty list refresh from service
    if (Object.keys(AnglerService.anglers).length==0) {
      AnglerService.getAnglers();
    }
    // if empty list refresh from service
    if (Object.keys(FishService.fishes).length==0) {
      FishService.getFish();
    }

    $timeout(function () {
      vm.setSelects();
    }, 2000);

    vm.clearCatch = function () {
      vm.session.date = null;
      vm.setSelects();
    }

    vm.refreshCatches = function () {
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

    vm.setSelects = function() {
      if(vm.sessionModel.sessions) {
        vm.catch.session = vm.sessionModel.sessions[0].id;
      }
      if(vm.anglerModel.anglers){
        vm.catch.angler = vm.anglerModel.anglers[0].id;
      }
      if(vm.fishModel.fishes) {
        vm.catch.fish = vm.fishModel.fishes[0].code;
      }
      if(vm.initAmountRange) {
        vm.catch.amount = vm.amountRange[0];
      }
      if(vm.initWeightRange) {
        vm.catch.weight = vm.weightRange[0];
      }
    }

  }

  PagesCatchesController.$inject = ['CatchService', 'SessionService', 'AnglerService', 'FishService', 'MessageService', '$timeout'];

  angular.module('fishingApp')
  .component('pagesCatches', {

    templateUrl: 'components/catches/catches.html',
    controller: PagesCatchesController

  });

})();
