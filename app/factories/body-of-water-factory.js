(function () {
  'use strict';

  angular.module('fishingApp')

  .service('BodyOfWaterFactory', function ($http) {

    var factory = {};

    // get all data from database
    factory.getBodiesOfWater = function (){
         var promise = $http({
             method: 'POST',
             url: 'http://localhost:8080/Fishing/app/db/bodiesOfWater.php',
             data: $.param({'type':'getBodiesOfWater'}),
             headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
         return promise;
     };

     return factory;

  });

})();
