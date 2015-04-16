/*
 *   CycleController as cycleCtrl
 *   Description: Controller for Cycle section view
 * */

'use strict';

iuvare.controller('CycleController', ["$scope", "$rootScope", "AuthService", "CycleService", "NetworkService", "SessionService", "DEFAULT_VALUES", function($scope, $rootScope, AuthService, CycleService, NetworkService, SessionService, DEFAULT_VALUES){

    $scope.DOWNLINE_LENGTH_LIMIT = DEFAULT_VALUES.DOWNLINE_LENGTH_LIMIT;

    $scope.downlines = [];
    $scope.sectionTitle = undefined;
    $scope.currentUserName = undefined;
    $scope.currentDownlineIndex = undefined;
    $scope.showDownlineList = false;


    $scope.getDownlineLengthLimit = function(length){
      return new Array(length);
    };

    $scope.isCurrentDownline = function(downlineIndex){
        return ($scope.currentDownlineIndex !== undefined)?  ($scope.currentDownlineIndex == downlineIndex): false;
    };

    $scope.resetDownlinesListVisibility = function(){
        for(var downlineIndex=0; downlineIndex<DEFAULT_VALUES.DOWNLINE_LENGTH_LIMIT; downlineIndex++){
            $scope.downlinesListVisibility[downlineIndex].visible = false;
        }
    };

    $scope.setCurrentDownline = function($event, downlineIndex){
        $event.preventDefault();
        $scope.currentDownlineIndex = downlineIndex;
    };

    $scope.isDownlineListVisible = function (downlineIndex) {
        return false;
    };

    $scope.attachDownline = function(downlineIndex){

    };

    $scope.detachDownline = function(downlineIndex){
        $scope.downlines.splice(downlineIndex,1);
    };

    // Method to init the controller's default state
    $scope.initController = function(){

        $scope.$emit('setCurrentSection');

        $scope.sectionTitle = $scope.currentSubsection.title;

        // Obtenemos los downlines del usuario
        CycleService.getDownlines().then(
            function(downlineList){
                $scope.downlines = angular.copy(downlineList);
            }
        );

        $scope.currentUserName = SessionService.$get().getFirstName() + " " + SessionService.$get().getLastName();

    };

    $scope.initController();

}]);