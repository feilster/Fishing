(function () {
  'use strict';

  angular.module('fishingApp')

  .factory('VenueFactory', function ($http) {

    var factory = {};
    var url = 'http://localhost:8080/Fishing/app/db/venues.php';

    // get all data from database
    factory.getVenues = function (){
         var promise = $http({
             method: 'POST',
             url: url,
             data: $.param({'requestType':'getVenues'}),
             headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
         return promise;
     };

     factory.insertVenue = function (venue){
          var promise = $http({
              method: 'POST',
              url: url,
              data: $.param({'requestType':'insertVenue', 'code':venue.code.toUpperCase(), 'bodyOfWater':venue.bodyOfWater, 'name':venue.name, 'comments':venue.comments, 'rates':venue.rates}),
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
             });
          return promise;
      };

      factory.deleteVenue = function (code){
           var promise = $http({
               method: 'POST',
               url: url,
               data: $.param({'requestType':'deleteVenue', 'code':code}),
               headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
              });
           return promise;
       };

       factory.updateVenue = function (code, bodyOfWater, name, comments, rates){
            var promise = $http({
                method: 'POST',
                url: url,
                data: $.param({'requestType':'updateVenue', 'code':code.toUpperCase(), 'bodyOfWater':bodyOfWater, 'name':name, 'comments':comments, 'rates':rates}),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
               });
            return promise;
        };

       return factory;

  });

})();
