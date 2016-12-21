(function () {
'use strict';

angular.module('FishingApp', [])

.controller('FishController', function ($scope, $http) {
  $scope.desc='jjiijjj';
   
   console.log('getting fish');
  getFish(); // Load all available fish 
    console.log('got fish');

  function getFish(){  
  $http.get("http://localhost:8080/Fishing/app/db/getFish.php").success(function(data){
     console.log('ret fish');
       $scope.fishes = data;
       console.log('found '+$scope.fishes.length);
       });
  };

});

})();
