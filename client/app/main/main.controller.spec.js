'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('lockersApp'));

  var MainCtrl,
      scope,
      $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/lockers')
      .respond([
        {slot:1, size: 'small', inUse: true},
        {slot:2, size: 'small', inUse: false},
        {slot:3, size: 'medium', inUse: true},
        {slot:4, size: 'medium', inUse: false},
        {slot:5, size: 'large', inUse: true},
        {slot:6, size: 'large', inUse: false}
      ]);

    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of lockers to the scope', function () {
    $httpBackend.flush();
    expect(scope.lockers.length).toBe(6);
    expect(scope.smallCount).toBe(2);
    expect(scope.mediumCount).toBe(2);
    expect(scope.largeCount).toBe(2);
    expect(scope.smallCountInUse).toBe(1);
    expect(scope.mediumCountInUse).toBe(1);
    expect(scope.largeCountInUse).toBe(1);
  });

  it('should have a method to drop-off in a locker', function () {
    expect(angular.isFunction(scope.dropOff)).toBeTruthy();
  });
  it('should have a method to pick up', function () {
    expect(angular.isFunction(scope.pickUp)).toBeTruthy();
  });

});
