'use strict';

angular.module('lockersApp')
  .factory('Locker', function ($resource) {
    return $resource('/api/lockers/:id', {
      id: '@_id'
    }, {
      update: {
        method: 'PUT',
        params: {}
      },
      wipe: {
        method: 'POST',
        url: '/api/lockers/clear',
        params: {}
      },
      setup: {
        method: 'POST',
        url: '/api/lockers/setup',
        params: {},
        isArray: true
      }
    }
  );
  });
