(function () {
  'use strict';

  angular.module('fishingApp')

  .service('VenueService', function ($http, VenueFactory, MessageService) {

    var service = this;

    service.venues = {};

    service.getVenues = function (){
      MessageService.clearMessages();
      VenueFactory.getVenues()
      .then(function (response) {
        service.venues = response.data.records;
        if(!response.data.success){
          MessageService.errorMessage = response.data.message;
        }
      }, function (response) {
        doError(response);
      });
    };

    service.insertVenue = function (fish){
      MessageService.clearMessages();
      VenueFactory.insertVenue(fish)
      .then(function(response) {
        doThen(response);
      }, function(response) {
        doError(response);
	    });
    };

    service.deleteVenue = function (code){
      MessageService.clearMessages();
      VenueFactory.deleteVenue(code)
      .then(function(response) {
        doThen(response);
      }, function(response) {
        doError(response);
	    });
    };

    service.updateVenue = function (code, bodyOfWater, name, comments, rates){
      MessageService.clearMessages();
      VenueFactory.updateVenue(code, bodyOfWater, name, comments, rates)
      .then(function(response) {
        doThen(response);
      }, function(response) {
        doError(response);
	    });
    };

    function doThen (response) {
      if(response.data.success){
        service.getVenues();
        MessageService.successMessage = response.data.message;
      } else {
        MessageService.errorMessage = response.data.message;
      }
    }

    function doError (response) {
      MessageService.errorMessage = response.data.message;
    }

  });

})();
