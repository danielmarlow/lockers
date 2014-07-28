'use strict';

angular.module('lockersApp')
  .controller('AdminCtrl', function ($scope, $log, Locker) {

    $scope.lockersInUse = [];

    function refreshLockers() {
      Locker.query().$promise.then(function(lockers) {
        $scope.lockers = lockers;
        $scope.lockersInUse = _.filter(lockers, function(locker) {
          return locker.inUse;
        });
      });
    }

    refreshLockers();

    $scope.wipeData = function() {
      angular.forEach($scope.lockers, function(locker) {
        locker.$remove();
      });
      refreshLockers();
    };

    $scope.createData = function() {
      var lockerSize;
      for (var i=1; i<=3000; i++) {
        if (i<=1000) {
          lockerSize = 'small';
        } else if (i<=2000) {
          lockerSize = 'medium';
        } else {
          lockerSize = 'large';
        }
        Locker.save({
          slot: i.toString(),
          size: lockerSize,
          inUse: false
        });
      }
      refreshLockers();
    };

    $scope.showByNumber = function() {
      $scope.selectedLocker = Locker.get({'id':$scope.lockerNumber});
      $log.debug($scope.selectedLocker);
    };

  });
