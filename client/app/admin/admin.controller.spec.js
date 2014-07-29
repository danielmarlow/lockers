'use strict';

describe('Controller: AdminCtrl', function () {

  // load the controller's module
  beforeEach(module('lockersApp'));

  var AdminCtrl, scope, httpBackend, mockLocker;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $httpBackend, Locker) {
    scope = $rootScope.$new();
    httpBackend = $httpBackend;
    mockLocker = Locker;
    AdminCtrl = $controller('AdminCtrl', {
      $scope: scope
    });
  }));

  it('should have a method to wipe all data', function () {
    httpBackend.expectGET('/api/lockers').respond(200, []);
    httpBackend.expectPOST('/api/lockers/clear').respond(204, {});
    var result = mockLocker.wipe();
    httpBackend.flush();

    expect(angular.isFunction(scope.wipeData)).toBeTruthy();
    scope.wipeData();
    expect(scope.lockers.length).toBe(0);
  });

  it('should have a method to create data', function () {
    var lockers = [
      {slot:'1', inUse:false, size:'small'},
      {slot:'2', inUse:false, size:'medium'},
      {slot:'3', inUse:false, size:'large'},
    ];

    httpBackend.expectGET('/api/lockers').respond(200, []);
    httpBackend.expectPOST('/api/lockers/setup').respond(201, lockers);
    var result = mockLocker.setup();
    httpBackend.flush();

    expect(angular.isFunction(scope.createData)).toBeTruthy();
    scope.createData();
    expect(result.length).toBe(3);
  });

});
