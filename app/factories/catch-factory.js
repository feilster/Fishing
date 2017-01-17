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

     factory.insertCatch = function (catchModel){
          var promise = $http({
              method: 'POST',
              url: url,
              data: $.param({'requestType':'insertCatch', 'session':catchModel.session, 'angler':catchModel.angler, 'fish':catchModel.fish, 'amount':catchModel.amount, 'weight':catchModel.weight}),
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
             });
          return promise;
      };

      factory.deleteCatch = function (catchModel){
           var promise = $http({
               method: 'POST',
               url: url,
               data: $.param({'requestType':'deleteCatch', 'id':catchModel.id}),
               headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
              });
           return promise;
       };

       factory.updateCatch = function (catchModel){
            var promise = $http({
                method: 'POST',
                url: url,
                data: $.param({'requestType':'updateCatch', 'id':catchModel.id, 'session':catchModel.session, 'angler':catchModel.angler, 'fish':catchModel.fish, 'amount':catchModel.amount, 'weight':catchModel.weight}),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
               });
            return promise;
        };

       return factory;

  });

})();
