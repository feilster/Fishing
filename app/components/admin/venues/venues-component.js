(function () {
  'use strict';

  function AdminVenuesController(VenueService, BodyOfWaterService, MessageService, $timeout) {

    var vm = this;

    vm.venue = {code: null, bodyOfWater: null, name: null, comments: null, rates: null}
    vm.codeLength = "4";

    vm.venueModel = VenueService;
    vm.messageModel = MessageService;
    vm.bodyOfWaterModel = BodyOfWaterService;

    // if empty list refresh from service
    if (Object.keys(vm.venueModel.venues).length==0) {
      VenueService.getVenues();
    }
    // if empty list refresh from service
    if (Object.keys(vm.bodyOfWaterModel.bodiesOfWater).length==0) {
      BodyOfWaterService.getBodiesOfWater();
    }
  //  vm.waterTypeCode = model.waterTypes[0].code;

    $timeout(function () {
      vm.setSelects();
    }, 2000);

    vm.insertVenue = function () {
      vm.venueModel.insertVenue(vm.venue);
    }

    vm.clearVenue = function () {
      vm.venue.code = null;
      vm.venue.bodyOfWater = null;
      vm.venue.name = null;
      vm.venue.comments = null;
      vm.venue.rates = null;
      vm.setSelects();
    }

    vm.refreshVenues = function () {
      VenueService.getVenues();
      MessageService.successMessage = MessageService.refreshSuccessMessage;
    }

    vm.setSelects = function() {
      if(vm.bodyOfWaterModel.bodiesOfWater) {
        vm.venue.bodyOfWater = vm.bodyOfWaterModel.bodiesOfWater[0].code;
      }
    }

  }

  AdminVenuesController.$inject = ['VenueService', 'BodyOfWaterService', 'MessageService', '$timeout'];

  angular.module('fishingApp')
  .component('adminVenues', {

    templateUrl: 'components/admin/venues/venues.html',
    controller: AdminVenuesController

  });

})();
