(function () {
  'use strict';

  angular.module('fishingApp')

  .service('StatsService', function ($http, StatsFactory, MessageService) {

    var service = this;

    service.anglerCatches = {};
    service.fishCatches = {};

    service.getAnglerCatches = function (){
      MessageService.clearMessages();
      StatsFactory.getAnglerCatches()
      .then(function (response) {
        service.anglerCatches = response.data.records;
        if(!response.data.success){
          MessageService.errorMessage = response.data.message;
        }
      }, function (response) {
        doError(response);
      });
    };

    service.getFishCatches = function (){
      MessageService.clearMessages();
      StatsFactory.getFishCatches()
      .then(function (response) {
        service.fishCatches = response.data.records;
        if(!response.data.success){
          MessageService.errorMessage = response.data.message;
        }
      }, function (response) {
        doError(response);
      });
    };

    function doError (response) {
      MessageService.errorMessage = response.data.message;
    }

  });

})();
