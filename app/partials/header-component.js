(function () {
  'use strict';

  angular.module('fishingApp')

  .component('header', {

    template: '<h2>{{$ctrl.text}}</h2>',
    bindings: {text: '@'}

  });

})();
