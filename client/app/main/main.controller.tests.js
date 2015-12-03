'use strict';

describe('Add Symbol', function() {

  //load the module
  beforeEach(module('stockjumpApp'));

  var MainCtrl,
      scope,
      $httpBackend;

  //initialize the controller and a mock scope
  beforeEach(inject(function(_$httpBackend_, $controller, $scope){
    $httpBackend = _$httpBackend_;
    scope = $rootScope.new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should return JSON object with symbol and _id', function() {
    $httpBackend.expectPOST('/api/symbols', {symbol: 'test'}).respond(201);
  })


});
