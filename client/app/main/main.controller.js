'use strict';

angular.module('lockersApp')
  .controller('MainCtrl', function ($scope, $http, $log, Locker) {

    $scope.pickupMessage;

    function refreshLockers() {
      Locker.query().$promise.then(function(lockers) {
        $scope.lockers = lockers;
        $scope.smallCount = _.filter(lockers, function(locker) {
          return locker.size === 'small';
        }).length;
        $scope.smallCountInUse = _.filter(lockers, function(locker) {
          return locker.size === 'small' && locker.inUse;
        }).length;
        $scope.mediumCount = _.filter(lockers, function(locker) {
          return locker.size === 'medium';
        }).length;
        $scope.mediumCountInUse = _.filter(lockers, function(locker) {
          return locker.size === 'medium' && locker.inUse;
        }).length;
        $scope.largeCount = _.filter(lockers, function(locker) {
          return locker.size === 'large';
        }).length;
        $scope.largeCountInUse = _.filter(lockers, function(locker) {
          return locker.size === 'large' && locker.inUse;
        }).length;
      });
    }

    refreshLockers();

    $scope.dropOff = function(size) {
      var firstLocker = _.chain($scope.lockers)
        .filter(function(locker) {
          return locker.size === size && !locker.inUse;
        })
        .first().value();
      $scope.checkedInLocker = firstLocker;
      firstLocker.inUse = true;
      firstLocker.$update();
      refreshLockers();
    };

    $scope.pickUp = function() {
      // $log.debug($scope.lockerNumber);
      var theLocker = _.chain($scope.lockers)
         .filter(function(locker) {
        return locker.slot === $scope.lockerNumber && locker.inUse;
      })
      .first().value();
      if (theLocker) {
        theLocker.inUse = false;
        theLocker.$update();
        $scope.pickupMessage = 'Slot ' + $scope.lockerNumber + ' is now available.';
        refreshLockers();
      } else {
        $scope.pickupMessage = 'Yeah, I\'m pretty sure somebody already picked up that locker\'s stuff.';
      }
    };

  });
