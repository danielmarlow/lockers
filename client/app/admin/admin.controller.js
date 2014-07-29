'use strict';

angular.module('lockersApp')
  .controller('AdminCtrl', function ($scope, $log, Locker) {

    $scope.lockersInUse = [];
    $scope.lockers = [];

    function refreshLockers() {
      $scope.lockersInUse = _.filter($scope.lockers, function(locker) {
        return locker.inUse;
      });
      $scope.buttonDisabled = false;
    }

    Locker.query().$promise.then(function(lockers) {
      $scope.lockers = lockers;
      refreshLockers();
    });

    $scope.wipeData = function() {
      $scope.buttonDisabled = true;
      Locker.wipe().$promise.then(function() {
        $scope.lockers = [];
        refreshLockers();
      });
    };

    $scope.createData = function() {
      console.log('createData');
      $scope.buttonDisabled = true;
      Locker.setup().$promise.then(function(lockers) {
        console.log('returned from setup on server');
        $scope.lockers = lockers;
        refreshLockers();
      });
    };

    $scope.showByNumber = function() {
      $scope.selectedLocker = Locker.get({'id':$scope.lockerNumber});
      $log.debug($scope.selectedLocker);
    };

  });
