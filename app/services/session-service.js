(function () {
  'use strict';

  angular.module('fishingApp')

  .service('SessionService', function ($http, SessionFactory, MessageService) {

    var service = this;

    service.sessions = {};

    service.getSessions = function (){
      MessageService.clearMessages();
      SessionFactory.getSessions()
      .then(function (response) {
        service.sessions = response.data.records;
        if(!response.data.success){
          MessageService.errorMessage = response.data.message;
        }
      }, function (response) {
        doError(response);
      });
    };

    service.insertSession = function (session){
      MessageService.clearMessages();
      SessionFactory.insertSession(session)
      .then(function(response) {
        doThen(response);
      }, function(response) {
        doError(response);
	    });
    };

    service.deleteSession = function (session){
      MessageService.clearMessages();
      SessionFactory.deleteSession(session)
      .then(function(response) {
        doThen(response);
      }, function(response) {
        doError(response);
	    });
    };

    service.updateSession = function (session){
      MessageService.clearMessages();
      SessionFactory.updateSession(session)
      .then(function(response) {
        doThen(response);
      }, function(response) {
        doError(response);
	    });
    };

    function doThen (response) {
      if(response.data.success){
        service.getSessions();
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
