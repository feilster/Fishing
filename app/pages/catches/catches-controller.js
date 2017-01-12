(function () {
  'use strict';

  angular.module('fishingApp')

  .controller('PagesCatchesController', function (CatchService, CatchService, MessageService, $timeout) {

    var vm = this;

    vm.session = {id: null, session: null, angler: null, fish: null, weight: null}

    vm.sessionModel = CatchService;
    vm.messageModel = MessageService;
    vm.venueModel = CatchService;

    // if empty list refresh from service
    if(!CatchService || !CatchService.sessions || Object.keys(CatchService.sessions).length==0) {
      CatchService.getCatches();
    }
    // if empty list refresh from service
    if(Object.keys(CatchService.catches).length==0) {
      CatchService.getCatchs();
    }

    $timeout(function () {
      vm.setSelects();
    }, 2000);

    vm.insertCatch = function (){
      vm.session.date = toISOString(vm.session.date);
      vm.sessionModel.insertCatch(vm.session);
    }

    vm.clearCatch = function (){
      vm.session.date = null;
      vm.setSelects();
    }

    vm.refreshCatches = function (){
      CatchService.getCatches();
      MessageService.successMessage = MessageService.refreshSuccess;
    }

    vm.setSelects = function(){
      if(vm.venueModel.catches){
        vm.session.venue = vm.venueModel.catches[0].code;
      }
    }

  });

})();
