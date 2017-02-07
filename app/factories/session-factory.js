(function () {
  'use strict';

  angular.module('fishingApp')

  .factory('SessionFactory', function ($http, ConstantsService) {

    var factory = {};
    var url = ConstantsService.sessionsUrl;

    // get all data from database
    factory.getSessions = function (){
         var promise = $http({
             method: 'POST',
             url: url,
             data: $.param({'requestType':'getSessions'}),
             headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
         return promise;
     };

     factory.insertSession = function (session){
          var promise = $http({
              method: 'POST',
              url: url,
              data: $.param({'requestType':'insertSession', 'venue':session.venue, 'date':session.date, 'comments':session.comments}),
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
             });
          return promise;
      };

      factory.deleteSession = function (session){
           var promise = $http({
               method: 'POST',
               url: url,
               data: $.param({'requestType':'deleteSession', 'id':session.id}),
               headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
              });
           return promise;
       };

       factory.updateSession = function (session){
            var promise = $http({
                method: 'POST',
                url: url,
                data: $.param({'requestType':'updateSession', 'id':session.id , 'venue':session.venue, 'date':session.date, 'comments':session.comments}),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
               });
            return promise;
        };

       return factory;

  });

})();
