(function () {
  'use strict';

  angular.module('fishingApp')

  .service('CatchService', function ($http, CatchFactory, MessageService) {

    var service = this;

    service.catches = {};

    service.getCatches = function (){
      MessageService.clearMessages();
      CatchFactory.getCatches()
      .then(function (response) {
        service.catches = response.data.records;
        if(!response.data.success){
          MessageService.errorMessage = response.data.message;
        }
      }, function (response) {
        doError(response);
      });
    };

    service.insertCatch = function (catchModel){
      MessageService.clearMessages();
      CatchFactory.insertCatch(catchModel)
      .then(function(response) {
        doThen(response);
      }, function(response) {
        doError(response);
	    });
    };

    service.deleteCatch = function (catchModel){
      MessageService.clearMessages();
      CatchFactory.deleteCatch(catchModel)
      .then(function(response) {
        doThen(response);
      }, function(response) {
        doError(response);
	    });
    };

    service.updateCatch = function (catchModel){
      MessageService.clearMessages();
      CatchFactory.updateCatch(catchModel)
      .then(function(response) {
        doThen(response);
      }, function(response) {
        doError(response);
	    });
    };

    function doThen (response) {
      if(response.data.success){
        service.getCatches();
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
