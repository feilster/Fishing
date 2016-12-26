(function () {
  'use strict';

  angular.module('fishingApp')

  .service('WaterTypeFactory', function ($http) {

    var factory = {};

    // get all data from database
    factory.getWaterTypes = function (){
         var promise = $http({
             method: 'POST',
             url: 'http://localhost:8080/Fishing/app/db/waterTypes.php',
             data: $.param({'type':'getWaterTypes'}),
             headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
         return promise;
     };

     return factory;

  });

})();
