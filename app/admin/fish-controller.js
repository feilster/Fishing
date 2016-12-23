(function () {
  'use strict';

  angular.module('fishingApp')

  .controller('FishController', function ($scope, $http) {

    var vm = this;

    vm.code = null;
    vm.description = null;
    vm.errorMessage = null;

    getFish(); // Load all available fish

    function getFish(){
      $http({
          method: "post",
          url: "http://localhost:8080/Fishing/app/db/fish.php",
          data: $.param({'type':'getFish'}),
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).success(function(data, status, headers, config) {
          console.log('ret fish');
          vm.fishes = data;
          console.log('found '+vm.fishes.length);
      }).error(function(data, status, headers, config) {
  	      console.log("halllooo");
  	  });
    };

    vm.insertFish = function (){
      console.log('start ins fish');
      $http({
          method: "post",
          url: "http://localhost:8080/Fishing/app/db/fish.php",
          data: $.param({'type':'insertFish', 'code':vm.code, 'description':vm.description}),
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).success(function(data, status, headers, config) {
          console.log('ins fish '+data);
          vm.errorMessage = data.message;
          getFish();
      }).error(function(data, status, headers, config) {
	        console.log("halllooo");
	    });
    };

  });

})();
