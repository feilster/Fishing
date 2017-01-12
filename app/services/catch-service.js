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

    service.insertCatch = function (catch){
      MessageService.clearMessages();
      CatchFactory.insertCatch(catch)
      .then(function(response) {
        doThen(response);
      }, function(response) {
        doError(response);
	    });
    };

    service.deleteCatch = function (id){
      MessageService.clearMessages();
      CatchFactory.deleteCatch(id)
      .then(function(response) {
        doThen(response);
      }, function(response) {
        doError(response);
	    });
    };

    service.updateCatch = function (catch){
      MessageService.clearMessages();
      CatchFactory.updateCatch(catch)
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
