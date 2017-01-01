(function () {
  'use strict';

  angular.module('fishingApp')

  .controller('MessagesController', function (MessageService) {

    var vm = this;

    vm.messageModel = MessageService;

  });

})();
