'use strict';

angular.module('lockersApp')
  .controller('MainCtrl', function ($scope, $http, $log, $timeout, $modal, Locker) {

    $scope.pickupMessage = '';

    function refreshLockers() {
      Locker.query().$promise.then(function(lockers) {
        $scope.lockers = lockers;
        $scope.smallCount = _.filter(lockers, function(locker) {
          return locker.size === 'small';
        }).length;
        $scope.smallCountNotInUse = _.filter(lockers, function(locker) {
          return locker.size === 'small' && !locker.inUse;
        }).length;
        $scope.mediumCount = _.filter(lockers, function(locker) {
          return locker.size === 'medium';
        }).length;
        $scope.mediumCountNotInUse = _.filter(lockers, function(locker) {
          return locker.size === 'medium' && !locker.inUse;
        }).length;
        $scope.largeCount = _.filter(lockers, function(locker) {
          return locker.size === 'large';
        }).length;
        $scope.largeCountNotInUse = _.filter(lockers, function(locker) {
          return locker.size === 'large' && !locker.inUse;
        }).length;
        $scope.openLockers = _.filter(lockers, function(locker) {
          return !locker.inUse;
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
      if (firstLocker) {
        $scope.checkedInLocker = firstLocker;
        firstLocker.inUse = true;
        firstLocker.$update();
        $scope.open('sm');
        refreshLockers();
      }
    };

    $scope.pickUp = function() {
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
        $scope.lockerNumber = '';
        $timeout(function() {
          $scope.pickupMessage = '';
        }, 5000);
      } else {
        $scope.pickupMessage = 'Yeah, I\'m pretty sure somebody already picked up that locker\'s stuff.';
      }
    };

    $scope.open = function (size) {

      var modalInstance = $modal.open({
        templateUrl: 'myModalContent.html',
        controller: ModalInstanceCtrl,
        size: size,
        resolve: {
          locker: function () {
            return $scope.checkedInLocker;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

  });

  var ModalInstanceCtrl = function ($scope, $log, $modalInstance, locker, Twilio) {

  $scope.locker = locker;

  $scope.sendSMS = function(theForm) {
    Twilio.sendSMS({locker: $scope.locker.slot, number: $scope.phone}, function() {
      $scope.message = 'Claim check sent!';
    }, function() {
      $scope.message = 'Claim check could not be sent to that number.';
    });
  };

  $scope.done = function () {
    $modalInstance.dismiss('cancel');
  };
};
