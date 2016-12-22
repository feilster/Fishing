(function () {
'use strict';

angular.module('fishingApp')

.controller('FishController', function ($scope, $http) {

  var vm = this;

  vm.code = null;
  vm.description = null;

  getFish(); // Load all available fish

  function getFish(){
    $http.get("http://localhost:8080/Fishing/app/db/getFish.php").success(function(data){
      console.log('ret fish');
        vm.fishes = data;
        console.log('found '+vm.fishes.length);
       });
  };

  vm.insertFish = function (){
    $http.post("http://localhost:8080/Fishing/app/db/insertFish.php?code="+vm.code+"&description="+vm.description).success(function(data){
      console.log('ins fish');
      getFish();
    });
  };

  });

})();
