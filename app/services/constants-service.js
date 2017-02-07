(function () {
  'use strict';

  angular.module('fishingApp')

  .service('ConstantsService', function () {

    var service = this;

    service.sessionsUrl = 'http://localhost:8080/Fishing/app/db/sessions.php';
    service.statsUrl = 'http://localhost:8080/Fishing/app/db/stats.php';

  });

})();
