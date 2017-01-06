(function () {
  'use strict';

  angular.module('fishingApp')

  .service('AnglerService', function ($http, AnglerFactory, MessageService) {

    var service = this;

    service.anglers = {};

    service.getAnglers = function (){
      MessageService.clearMessages();
      AnglerFactory.getAnglers()
      .then(function (response) {
        service.anglers = response.data.records;
        if(!response.data.success){
          MessageService.errorMessage = response.data.message;
        }
      }, function (response) {
        doError(response);
      });
    };

    service.insertAngler = function (angler){
      MessageService.clearMessages();
      AnglerFactory.insertAngler(angler)
      .then(function(response) {
        doThen(response);
      }, function(response) {
        doError(response);
	    });
    };

    service.deleteAngler = function (id){
      MessageService.clearMessages();
      AnglerFactory.deleteAngler(id)
      .then(function(response) {
        doThen(response);
      }, function(response) {
        doError(response);
	    });
    };

    service.updateAngler = function (angler){
      MessageService.clearMessages();
      AnglerFactory.updateAngler(angler)
      .then(function(response) {
        doThen(response);
      }, function(response) {
        doError(response);
	    });
    };

    function doThen (response) {
      if(response.data.success){
        service.getAnglers();
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
