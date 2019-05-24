(function () {
  'use strict';

  function AdminFishController(FishService, WaterTypeService, MessageService, $timeout) {

    var vm = this;

    vm.fish = {code: null, type: null, subtype: null, description: null, waterType: null, indigenous: null, otherNames: null, species: null}
    vm.indigenousTypes = [{code:'Y', description:'Yes'}, {code:'N', description:'No'}]
    vm.codeLength = "4";

    vm.fishModel = FishService;
    vm.messageModel = MessageService;
    vm.waterTypeModel = WaterTypeService;

    // if empty list refresh from service
    if (Object.keys(vm.fishModel.fishes).length==0) {
      FishService.getFish();
    }
    // if empty list refresh from service
    if (Object.keys(vm.waterTypeModel.waterTypes).length==0) {
      WaterTypeService.getWaterTypes();
    }
  //  vm.waterTypeCode = model.waterTypes[0].code;

    $timeout(function () {
      vm.setSelects();
    }, 2000);

    vm.insertFish = function () {
      vm.fishModel.insertFish(vm.fish);
    }

    vm.clearFish = function () {
      vm.fish.code = null;
      vm.fish.type = null;
      vm.fish.subType = null;
      vm.fish.description = null;
      vm.fish.otherNames = null;
      vm.fish.species = null;
      vm.setSelects();
    }

    vm.refreshFish = function () {
      FishService.getFish();
      MessageService.successMessage = 'Successfully refreshed';
    }

    vm.setSelects = function() {
      if(vm.waterTypeModel.waterTypes){
        vm.fish.waterType = vm.waterTypeModel.waterTypes[0].code;
      }
      vm.fish.indigenous = vm.indigenousTypes[0].code;
    }

    vm.items = ['item1', 'item2', 'item3'];

    vm.animationsEnabled = true;

    vm.open = function (size, parentSelector) {
      var parentElem = parentSelector ?
      angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
      var modalInstance = $uibModal.open({
        animation: vm.animationsEnabled,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl',
        controllerAs: 'vm',
        size: size,
        appendTo: parentElem,
        resolve: {
          items: function () {
            return vm.items;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        vm.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

    vm.openComponentModal = function () {
      var modalInstance = $uibModal.open({
        animation: vm.animationsEnabled,
        component: 'modalComponent',
        resolve: {
          items: function () {
            return vm.items;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        vm.selected = selectedItem;
      }, function () {
        $log.info('modal-component dismissed at: ' + new Date());
      });
    };

    // $uibModal.open({
    //   animation: vm.animationsEnabled,
    //   ariaLabelledBy: 'modal-title-top',
    //   ariaDescribedBy: 'modal-body-top',
    //   templateUrl: 'stackedModal.html',
    //   size: 'sm',
    //   controller: function($scope) {
    //     $scope.name = 'top';
    //   }
    // });

    vm.toggleAnimation = function () {
      vm.animationsEnabled = !vm.animationsEnabled;
    };

  }

  AdminFishController.$inject = ['FishService', 'WaterTypeService', 'MessageService', '$timeout'];

  angular.module('fishingApp')
  .component('adminFish', {

    templateUrl: 'components/admin/fish/fish.html',
    controller: AdminFishController

  });

})();
