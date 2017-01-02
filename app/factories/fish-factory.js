(function () {
  'use strict';

  angular.module('fishingApp')

  .factory('FishFactory', function ($http) {

    var factory = {};
    var url = 'http://localhost:8080/Fishing/app/db/fish.php';

    // get all data from database
    factory.getFish = function (){
         var promise = $http({
             method: 'POST',
             url: url,
             data: $.param({'requestType':'getFish'}),
             headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
         return promise;
     };

     factory.insertFish = function (fish){
          var promise = $http({
              method: 'POST',
              url: url,
              data: $.param({'requestType':'insertFish', 'code':fish.code.toUpperCase(), 'type':fish.type, 'subType':fish.subType, 'description':fish.description, 'waterTypeCode':fish.waterType, 'otherNames':fish.otherNames, 'indigenous':fish.indigenous}),
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
             });
          return promise;
      };

      factory.deleteFish = function (code){
           var promise = $http({
               method: 'POST',
               url: url,
               data: $.param({'requestType':'deleteFish', 'code':code}),
               headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
              });
           return promise;
       };

       factory.updateFish = function (code, type, subType, description, waterTypeCode, otherNames, indigenous){
            var promise = $http({
                method: 'POST',
                url: url,
                data: $.param({'requestType':'updateFish', 'code':code.toUpperCase(), 'type':type, 'subType':subType, 'description':description, 'waterTypeCode':waterTypeCode, 'otherNames':otherNames, 'indigenous':indigenous}),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
               });
            return promise;
        };

       return factory;

  });

})();
