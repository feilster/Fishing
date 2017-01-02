(function () {
  'use strict';

  angular.module('fishingApp')

  .controller('AdminFishController', function (FishService, WaterTypeService, MessageService, $timeout) {

    var vm = this;

    vm.fish = {code: null, type: null, subtype: null, description: null, waterType: null, indigenous: null, otherNames: null, species: null}
    vm.indigenousTypes = [{code:'Y', description:'Yes'}, {code:'N', description:'No'}]
    vm.codeLength = "4";

    vm.fishModel = FishService;
    vm.messageModel = MessageService;
    vm.waterTypeModel = WaterTypeService;

    // if empty list refresh from service
    if(Object.keys(vm.fishModel.fishes).length==0) {
      FishService.getFish();
    }
    // if empty list refresh from service
    if(Object.keys(vm.waterTypeModel.waterTypes).length==0) {
      WaterTypeService.getWaterTypes();
    }
  //  vm.waterTypeCode = model.waterTypes[0].code;

    $timeout(function () {
      vm.setSelects();
    }, 2000);

    vm.insertFish = function (){
      vm.fishModel.insertFish(vm.fish);
    }

    vm.clearFish = function (){
      vm.fish.code = null;
      vm.fish.type = null;
      vm.fish.subType = null;
      vm.fish.description = null;
      vm.fish.otherNames = null;
      vm.fish.species = null;
      vm.setSelects();
    }

    vm.refreshFish = function (){
      FishService.getFish();
      MessageService.successMessage = 'Successfully refreshed';
    }

    vm.setSelects = function(){
      if(vm.waterTypeModel.waterTypes){
        vm.fish.waterType = vm.waterTypeModel.waterTypes[0].code;
      }
      vm.fish.indigenous = vm.indigenousTypes[0].code;
    }

  });

})();
