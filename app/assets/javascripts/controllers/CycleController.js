/*
 *   CycleController as cycleCtrl
 *   Description: Controller for Cycle section view
 * */

'use strict';

iuvare.controller('CycleController', ["$scope", "$rootScope", "AuthService", "CycleService", "SessionService", "DEFAULT_VALUES", function($scope, $rootScope, AuthService, CycleService, SessionService, DEFAULT_VALUES){

    $scope.DOWNLINE_LENGTH_LIMIT = DEFAULT_VALUES.DOWNLINE_LENGTH_LIMIT;

    $scope.downlines = [];
    $scope.sectionTitle = undefined;
    $scope.currentUserName = undefined;
    $scope.currentDownline = undefined;


    $scope.getDownlineLengthLimit = function(length){
      return new Array(length);
    };

    $scope.isCurrentDownline = function(downline){
      return ($scope.currentDownline)?  ($scope.currentDownline.getId() == downline.getId()): false;
    };

    $scope.setCurrentDownline = function($event, downline){
        $event.preventDefault();
        $scope.currentDownline = downline;
    };

    // Method to init the controller's default state
    $scope.initController = function(){

        $scope.$emit('setCurrentSection');

        $scope.sectionTitle = $scope.currentSubsection.title;

        // Obtenemos los downlines del usuario
        CycleService.getDownlines().then(
            function(downlineList){
                $scope.downlines = downlineList;
            }
        );

        $scope.currentUserName = SessionService.$get().getFirstName() + " " + SessionService.$get().getLastName();

    };

    $scope.initController();

}]);