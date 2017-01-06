(function () {
  'use strict';

  angular.module('fishingApp')

  .controller('PagesSessionsController', function (SessionService, VenueService, MessageService, $timeout) {

    var vm = this;

    vm.session = {id: null, venue: null, date: null}

    vm.sessionModel = SessionService;
    vm.messageModel = MessageService;
    vm.venueModel = VenueService;

    // if empty list refresh from service
    if(Object.keys(vm.sessionModel.sessions).length==0) {
      SessionService.getSessions();
    }
    // if empty list refresh from service
    if(Object.keys(vm.venueModel.venues).length==0) {
      VenueService.getVenues();
    }

    $timeout(function () {
      vm.setSelects();
    }, 2000);

    vm.insertSession = function (){
      vm.venueModel.insertSession(vm.venue);
    }

    vm.clearSession = function (){
      vm.session.date = null;
      vm.setSelects();
    }

    vm.refreshSessions = function (){
      SessionService.getSessions();
      MessageService.successMessage = MessageService.refreshSuccessMessage;
    }

    vm.setSelects = function(){
      if(vm.venueModel.venues){
        vm.session.venue = vm.venueModel.venues[0].code;
      }
    }

  });

})();
