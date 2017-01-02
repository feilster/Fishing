(function () {
  'use strict';

  angular.module('fishingApp')

  .component('subheader', {

    template: '<div class="well"><span class="subheader">{{$ctrl.text}} <span>{{$ctrl.subtext}}</span></span><span ng-transclude></span></div>',
    bindings: {text: '@', subtext: '@'},
    transclude: true

  });

})();
