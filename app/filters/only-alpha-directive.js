(function () {
  'use strict';

  angular.module('fishingApp')

  .directive('onlyAlpha', function() {
    return {
      require: 'ngModel',
      link: function (scope, element, attr, modelCtrl) {
        function fromUser(text) {
          var transformedInput = text.replace(/[^a-zA-Z]/g, '');
          console.log(transformedInput);
          if(transformedInput !== text) {
              modelCtrl.$setViewValue(transformedInput);
              modelCtrl.$render();
          }
          return transformedInput;  // or return Number(transformedInput)
        }
        modelCtrl.$parsers.push(fromUser);
      }
    };
  });
})();
