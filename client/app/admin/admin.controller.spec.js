'use strict';

describe('Controller: AdminCtrl', function () {

  // load the controller's module
  beforeEach(module('lockersApp'));

  var AdminCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminCtrl = $controller('AdminCtrl', {
      $scope: scope
    });
  }));

  it('should have a method to create data', function () {
    expect(angular.isFunction(scope.createData)).toBeTruthy();
  });

});
