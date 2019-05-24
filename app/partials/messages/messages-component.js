(function () {
  'use strict';

  function MessagesController(MessageService) {

    var vm = this;

    vm.messageModel = MessageService;

  }

  MessagesController.$inject = ['MessageService'];

  angular.module('fishingApp')
  .component('messages', {

    templateUrl: 'partials/messages/messages.html',
    controller: MessagesController

  });

})();
