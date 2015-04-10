/*
 *   CycleController as cycleCtrl
 *   Description: Controller for Cycle section view
 * */

'use strict';

iuvare.controller('GlobalMenuController', ["$scope", "$rootScope", "$state", "SessionService", "DEFAULT_VALUES", function($scope, $rootScope, $state, SessionService, DEFAULT_VALUES){

    $scope.NAV_ITEMS = DEFAULT_VALUES.SECTIONS;

    $scope.isCurrentSection = function(sectionCode){
        return $scope.currentSection.code == sectionCode;
    };

    // Method to init the controller's default state
    $scope.initController = function(){
        $scope.userName = (SessionService.$get().getFirstName() || SessionService.$get().getLastName()) ? SessionService.$get().getFirstName() + " " + SessionService.$get().getLastName() : 'Usuario';
    };

    $scope.initController();

}]);