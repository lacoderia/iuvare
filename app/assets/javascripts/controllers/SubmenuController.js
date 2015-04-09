/*
 *   CycleController as cycleCtrl
 *   Description: Controller for Cycle section view
 * */

'use strict';

iuvare.controller('SubmenuController', ["$scope", "$rootScope", "AuthService", "NavigationService", "DEFAULT_VALUES", function($scope, $rootScope, AuthService, NavigationService, DEFAULT_VALUES){

    $scope.isCurrentSubsection = function (currentSubsection) {
        return (currentSubsection == $scope.currentSubsection.code);
    };

    // Method to init the controller's default state
    $scope.initController = function(){

    };


}]);