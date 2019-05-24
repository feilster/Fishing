(function () {
  'use strict';

  function AdminAnglersController(AnglerService, MessageService, $timeout) {

    var vm = this;

    vm.angler = {id: null, nickName: null, firstName: null, surname: null}

    vm.anglerModel = AnglerService;
    vm.messageModel = MessageService;

    // if empty list refresh from service
    if(Object.keys(vm.anglerModel.anglers).length==0) {
      AnglerService.getAnglers();
    }

    vm.insertAngler = function () {
      vm.anglerModel.insertAngler(vm.angler);
    }

    vm.clearAngler = function () {
      vm.angler.nickName = null;
      vm.angler.firstName = null;
      vm.angler.surname = null;
    }

    vm.refreshAngler = function () {
      AnglerService.getAnglers();
      MessageService.successMessage = MessageService.refreshSuccessMessage;
    }

  }

  AdminAnglersController.$inject = ['AnglerService', 'MessageService', '$timeout'];

  angular.module('fishingApp')
  .component('adminAnglers', {

    templateUrl: 'components/admin/anglers/anglers.html',
    controller: AdminAnglersController

  });

})();
