(function () {
  'use strict';

  angular.module('fishingApp')

  .service('BodyOfWaterService', function ($http, BodyOfWaterFactory) {

    var service = this;

    service.bodiesOfWater = {};
    service.errorMessage = null;

    service.getBodiesOfWater = function (){
      BodyOfWaterFactory.getBodiesOfWater()
      .then(function (response) {
        service.bodiesOfWater = response.data.records;
        if(!response.data.success){
          service.errorMessage = response.data.message;
        }
      }, function (response) {
        service.errorMessage = response.data.message;
      });
    };

  });

})();
