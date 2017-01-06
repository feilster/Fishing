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
              data: $.param({'requestType':'insertFish', 'code':fish.code.toUpperCase(), 'type':fish.type, 'subType':fish.subType, 'description':fish.description, 'otherNames':fish.otherNames, 'species':fish.species, 'waterTypeCode':fish.waterType, 'indigenous':fish.indigenous}),
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

       factory.updateFish = function (fish){
            var promise = $http({
                method: 'POST',
                url: url,
                data: $.param({'requestType':'updateFish', 'code':fish.code.toUpperCase(), 'type':fish.type, 'subType':fish.sub_type, 'description':fish.description, 'otherNames':fish.other_names, 'species':fish.species, 'waterTypeCode':fish.water_type, 'indigenous':fish.indigenous}),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
               });
            return promise;
        };

       return factory;

  });

})();
