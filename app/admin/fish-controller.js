(function () {
  'use strict';

  angular.module('fishingApp')

  .controller('FishController', function ($scope, $http, FishFactory, WaterTypeFactory, ModelService) {

    var vm = this;

    vm.code = null;
    vm.model = ModelService;
    vm.description = null;
    vm.errorMessage = null;

    vm.getFish = function (){
      FishFactory.getFish()
      .then(function (response) {
        ModelService.fishes = response.data.records;
        if(!response.data.success){
          vm.errorMessage = response.data.message;
        }
      }, function (response) {
        vm.errorMessage = response.data.message;
      });
    };

    vm.getWaterTypes = function (){
      WaterTypeFactory.getWaterTypes()
      .then(function (response) {
        ModelService.waterTypes = response.data.records;
        vm.waterTypeCode = vm.model.waterTypes[0].code;
        if(!response.data.success){
          vm.errorMessage = response.data.message;
        }
      }, function (response) {
        vm.errorMessage = response.data.message;
      });
    };

    if(Object.keys(vm.model.fishes).length==0) {
      vm.getFish();
    }
    if(Object.keys(vm.model.waterTypes).length==0) {
      vm.getWaterTypes();
    }

    vm.insertFish = function (){
      console.log(vm.waterTypeCode);
      FishFactory.insertFish(vm.code, vm.description, vm.waterTypeCode)
      .then(function(response) {
          vm.errorMessage = response.data.message;
          if(response.data.success){
            vm.getFish();
          }
      }, function(response) {
          vm.errorMessage = response.data.message;
	    });
    };

    vm.deleteFish = function (code){
      FishFactory.deleteFish(code)
      .then(function(response) {
          vm.errorMessage = response.data.message;
          if(response.data.success){
            vm.getFish();
          }
      }, function(response) {
          vm.errorMessage = response.data.message;
	    });
    };

    vm.setSelected = function (code){
      console.log("sel = "+code);
    };

  });

})();
