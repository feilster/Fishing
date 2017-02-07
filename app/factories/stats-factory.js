(function () {
  'use strict';

  angular.module('fishingApp')

  .factory('StatsFactory', function ($http, ConstantsService) {

    var factory = {};
    var url = ConstantsService.statsUrl;

    // get all data from database
    factory.getAnglerCatches = function (){
         var promise = $http({
             method: 'POST',
             url: url,
             data: $.param({'requestType':'getAnglerCatches'}),
             headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
         return promise;
     };

     // get all data from database
     factory.getFishCatches = function (){
          var promise = $http({
              method: 'POST',
              url: url,
              data: $.param({'requestType':'getFishCatches'}),
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
             });
          return promise;
      };

      return factory;

  });

})();
