/*
 *   CycleController as cycleCtrl
 *   Description: Controller for Cycle section view
 * */

'use strict';

iuvare.controller('BusinessMenuController', ["$scope", "$rootScope", "AuthService", "AsideMenuService", "DEFAULT_VALUES", function($scope, $rootScope, AuthService, AsideMenuService, DEFAULT_VALUES){

    $scope.NAV_ITEMS = DEFAULT_VALUES.BUSINESS_SUBSECTIONS;
    $scope.currentSection = undefined;

    // Method to init the controller's default state
    $scope.initController = function(){
        $scope.currentSection = AsideMenuService.getCurrentSection();
    };

    $scope.isCurrentSection = function (currentSection) {
        return (currentSection == $scope.currentSection.code);
    };

    $scope.initController();

}]);