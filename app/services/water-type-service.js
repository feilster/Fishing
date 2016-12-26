(function () {
  'use strict';

  angular.module('fishingApp')

  .service('WaterTypeService', function ($http, WaterTypeFactory) {

    var service = this;

    service.waterTypes = {};
    service.errorMessage = null;

    service.getWaterTypes = function (){
      WaterTypeFactory.getWaterTypes()
      .then(function (response) {
        service.waterTypes = response.data.records;
        if(!response.data.success){
          service.errorMessage = response.data.message;
        }
      }, function (response) {
        service.errorMessage = response.data.message;
      });
    };

  });

})();
