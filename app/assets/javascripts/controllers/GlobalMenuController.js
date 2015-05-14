/*
 *   CycleController as cycleCtrl
 *   Description: Controller for Cycle section view
 * */

'use strict';

iuvare.controller('GlobalMenuController', ["$scope", "$rootScope", "$state", "AuthService", "SessionService", "DEFAULT_VALUES", function($scope, $rootScope, $state, AuthService, SessionService, DEFAULT_VALUES){

    $scope.NAV_ITEMS = DEFAULT_VALUES.SECTIONS;

    $scope.isCurrentSection = function(sectionCode){
        return ($scope.currentSection)? $scope.currentSection.code == sectionCode : false;
    };

    $scope.logout = function(){
        AuthService.logout();
    };

    $scope.logout = function(){
        AuthService.logout();
    };

    // Method to init the controller's default state
    $scope.initController = function(){
    };

    $scope.initController();

}]);