(function () {
  'use strict';

  angular.module('fishingApp')

  .controller('PagesCatchesController', function (CatchService, SessionService, AnglerService, FishService, MessageService, $timeout) {

    var vm = this;

    vm.catch = {id: null, session: null, angler: null, fish: null, weight: null}

    vm.catchModel = CatchService;
    vm.sessionModel = SessionService;
    vm.anglerModel = AnglerService;
    vm.fishModel = FishService;
    vm.messageModel = MessageService;

    // if empty list refresh from service
    if(!CatchService || !CatchService.sessions || Object.keys(CatchService.sessions).length==0) {
      CatchService.getCatches();
    }
    // if empty list refresh from service
    if(Object.keys(SessionService.sessions).length==0) {
      SessionService.getSessions();
    }
    // if empty list refresh from service
    if(Object.keys(AnglerService.anglers).length==0) {
      AnglerService.getAnglers();
    }
    // if empty list refresh from service
    if(Object.keys(FishService.fishes).length==0) {
      FishService.getFish();
    }

    $timeout(function () {
      vm.setSelects();
    }, 2000);

    vm.clearCatch = function (){
      vm.session.date = null;
      vm.setSelects();
    }

    vm.refreshCatches = function (){
      CatchService.getCatches();
      MessageService.successMessage = MessageService.refreshSuccess;
    }

    vm.setSelects = function(){
      if(vm.sessionModel.sessions){
        vm.catch.session = vm.sessionModel.sessions[0].code;
      }
      if(vm.anglerModel.anglers){
        vm.catch.angler = vm.anglerModel.anglers[0].code;
      }
      if(vm.fishModel.sessions){
        vm.catch.fish = vm.fishModel.fishes[0].code;
      }
    }

  });

})();
