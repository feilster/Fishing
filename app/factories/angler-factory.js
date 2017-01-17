(function () {
  'use strict';

  angular.module('fishingApp')

  .factory('AnglerFactory', function ($http) {

    var factory = {};
    var url = 'http://localhost:8080/Fishing/app/db/anglers.php';

    // get all data from database
    factory.getAnglers = function (){
         var promise = $http({
             method: 'POST',
             url: url,
             data: $.param({'requestType':'getAnglers'}),
             headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
         return promise;
     };

     factory.insertAngler = function (angler){
          var promise = $http({
              method: 'POST',
              url: url,
              data: $.param({'requestType':'insertAngler', 'nickName':angler.nickName, 'firstName':angler.firstName, 'surname':angler.surname}),
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
             });
          return promise;
      };

      factory.deleteAngler = function (id){
           var promise = $http({
               method: 'POST',
               url: url,
               data: $.param({'requestType':'deleteAngler', 'id':id}),
               headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
              });
           return promise;
       };

       factory.updateAngler = function (angler){
            var promise = $http({
                method: 'POST',
                url: url,
                data: $.param({'requestType':'updateAngler', 'id':angler.id, 'nickName':angler.nickName, 'firstName':angler.firstName, 'surname':angler.surname}),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
               });
            return promise;
        };

       return factory;

  });

})();
