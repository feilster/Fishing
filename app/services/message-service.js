(function () {
  'use strict';

  angular.module('fishingApp')

  .service('MessageService', function () {

    var service = this;

    service.successMessage = null;
    service.errorMessage = null;
    service.infoMessage = null;

    service.minLength = "Value is too short: ";
    service.requiredInput = "Value is required";
    service.requiredSelect = "Value is required";

    service.clearSuccessMessage = function () {
      service.successMessage = null;
    }

    service.clearErrorMessage = function () {
      service.errorMessage = null;
    }

    service.clearInfoMessage = function () {
      service.infoMessage = null;
    }

    service.clearMessages = function () {
      service.successMessage = null;
      service.errorMessage = null;
      service.infoMessage = null;
    }

  });

})();
