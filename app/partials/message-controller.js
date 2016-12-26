(function () {
  'use strict';

  angular.module('fishingApp')

  .controller('MessageController', function (MessageService) {

    var vm = this;

    vm.messageModel = MessageService;

  });

})();
