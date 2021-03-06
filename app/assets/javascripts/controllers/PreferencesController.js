/*
 *   CycleController as cycleCtrl
 *   Description: Controller for Cycle section view
 * */

'use strict';

iuvare.controller('PreferencesController', ["$scope", "$rootScope", "AuthService", "AsideMenuService", "DEFAULT_VALUES", function($scope, $rootScope, AuthService, AsideMenuService, DEFAULT_VALUES){

    // Method to init the controller's default state
    $scope.initController = function(){
        $scope.sectionTitle = DEFAULT_VALUES.BUSINESS_SUBSECTIONS[DEFAULT_VALUES.BUSINESS_SUBSECTIONS_POSITION.PREFERENCES].title;
        AsideMenuService.setCurrentSection(DEFAULT_VALUES.BUSINESS_SUBSECTIONS_POSITION.PREFERENCES);
    };

    $scope.initController();
}]);