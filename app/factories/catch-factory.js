(function () {
  'use strict';

  angular.module('fishingApp')

  .factory('CatchFactory', function ($http) {

    var factory = {};
    var url = 'http://localhost:8080/Fishing/app/db/catches.php';

    // get all data from database
    factory.getCatches = function (){
         var promise = $http({
             method: 'POST',
             url: url,
             data: $.param({'requestType':'getCatches'}),
             headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
         return promise;
     };

     factory.insertCatch = function (catch){
          var promise = $http({
              method: 'POST',
              url: url,
              data: $.param({'requestType':'insertCatch', 'catch':catch.catch, 'date':catch.date}),
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
             });
          return promise;
      };

      factory.deleteCatch = function (id){
           var promise = $http({
               method: 'POST',
               url: url,
               data: $.param({'requestType':'deleteCatch', 'id':id}),
               headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
              });
           return promise;
       };

       factory.updateCatch = function (catch){
            var promise = $http({
                method: 'POST',
                url: url,
                data: $.param({'requestType':'updateCatch', 'id':catch.id , 'catch':catch.catch, 'date':catch.date}),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
               });
            return promise;
        };

       return factory;

  });

})();
