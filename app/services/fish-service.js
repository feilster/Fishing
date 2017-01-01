(function () {
  'use strict';

  angular.module('fishingApp')

  .service('FishService', function ($http, FishFactory, MessageService) {

    var service = this;

    service.fishes = {};

    service.getFish = function (){
      MessageService.clearMessages();
      FishFactory.getFish()
      .then(function (response) {
        service.fishes = response.data.records;
        if(!response.data.success){
          MessageService.errorMessage = response.data.message;
        }
      }, function (response) {
        doError(response);
      });
    };

    service.insertFish = function (fish){
      MessageService.clearMessages();
      FishFactory.insertFish(fish.code, fish.type, fish.subType, fish.description, fish.waterType, fish.otherNames, fish.indigenousType)
      .then(function(response) {
        doThen(response);
      }, function(response) {
        doError(response);
	    });
    };

    service.deleteFish = function (code){
      MessageService.clearMessages();
      FishFactory.deleteFish(code)
      .then(function(response) {
        doThen(response);
      }, function(response) {
        doError(response);
	    });
    };

    service.updateFish = function (code, type, subType, description, waterTypeCode, otherNames, indigenous){
      MessageService.clearMessages();
      FishFactory.updateFish(code, type, subType, description, waterTypeCode, otherNames, indigenous)
      .then(function(response) {
        doThen(response);
      }, function(response) {
        doError(response);
	    });
    };

    function doThen (response) {
      if(response.data.success){
        service.getFish();
        MessageService.successMessage = response.data.message;
      } else {
        MessageService.errorMessage = response.data.message;
      }
    }

    function doError (response) {
      MessageService.errorMessage = response.data.message;
    }

  });

})();
