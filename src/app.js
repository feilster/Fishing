(function () {
'use strict';

angular.module('FishingApp', [])

.controller('FishController', function ($scope, $http) {
  $scope.fish='jjjjj';
   
   console.log('getting venues');
  getVenues(); // Load all available venues 
    console.log('got venues');

  function getVenues(){  
  $http.get("http://localhost:3000/db/getVenues.php").success(function(data){
     console.log('ret venues');
       $scope.venues = data;
       });
  };

});

})();
