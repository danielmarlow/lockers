'use strict';

angular.module('lockersApp')
  .factory('Locker', function ($resource) {
    return $resource('/api/lockers/:id', {
      id: '@_id'
    }, {
      update: {
        method: 'PUT',
        params: {}
      }
    }
  );
  });
