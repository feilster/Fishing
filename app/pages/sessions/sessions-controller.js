(function () {
  'use strict';

  angular.module('fishingApp')

  .controller('PagesSessionsController', function (SessionService, VenueService, MessageService, $timeout) {

    var vm = this;

    vm.session = {id: null, venue: null, date: null}

    vm.sessionModel = SessionService;
    vm.messageModel = MessageService;
    vm.venueModel = VenueService;

    vm.datePopup = {
      opened: false
    };

    vm.dateOptions = {
       showWeeks: true
    };

    vm.openDate = function() {
        vm.datePopup.opened = true;
    };

    // if empty list refresh from service
    if(!SessionService || !SessionService.sessions || Object.keys(SessionService.sessions).length==0) {
      SessionService.getSessions();
    }
    // if empty list refresh from service
    if(Object.keys(VenueService.venues).length==0) {
      VenueService.getVenues();
    }

    $timeout(function () {
      vm.setSelects();
    }, 2000);

    vm.insertSession = function (){
      vm.session.date = toISOString(vm.session.date);
      vm.sessionModel.insertSession(vm.session);
    }

    vm.clearSession = function (){
      vm.session.date = null;
      vm.setSelects();
    }

    vm.refreshSessions = function (){
      SessionService.getSessions();
      MessageService.successMessage = MessageService.refreshSuccess;
    }

    vm.setSelects = function(){
      if(vm.venueModel.venues){
        vm.session.venue = vm.venueModel.venues[0].code;
      }
    }

  });

})();
