'use strict';

angular.module('lockersApp')
  .factory('Twilio', function ($resource) {
    return $resource('/api/twilio/:locker/:number', {
      locker: '@locker',
      number: '@number'
    }, {
      sendSMS: {
        method: 'POST',
        params: {}
      }
    });
  });
