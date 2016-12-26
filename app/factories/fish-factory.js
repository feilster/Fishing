(function () {
  'use strict';

  angular.module('fishingApp')

  .factory('FishFactory', function ($http) {

    var factory = {};

    // get all data from database
    factory.getFish = function (){
         var promise = $http({
             method: 'POST',
             url: 'http://localhost:8080/Fishing/app/db/fish.php',
             data: $.param({'type':'getFish'}),
             headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
         return promise;
     };

     factory.insertFish = function (code, description, waterTypeCode){
          var promise = $http({
              method: 'POST',
              url: 'http://localhost:8080/Fishing/app/db/fish.php',
              data: $.param({'type':'insertFish', 'code':code, 'description':description, 'waterTypeCode':waterTypeCode}),
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
             });
          return promise;
      };

      factory.deleteFish = function (code){
           var promise = $http({
               method: 'POST',
               url: 'http://localhost:8080/Fishing/app/db/fish.php',
               data: $.param({'type':'deleteFish', 'code':code}),
               headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
              });
           return promise;
       };

       return factory;

  });

})();
