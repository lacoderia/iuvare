/*
 *   CycleController as cycleCtrl
 *   Description: Controller for Cycle section view
 * */

'use strict';

iuvare.controller('NetworkController', ["$scope", "$rootScope", "AuthService", "NavigationService", "NetworkService", "InvitationService", "DEFAULT_VALUES", function($scope, $rootScope, AuthService, NavigationService, NetworkService, InvitationService, DEFAULT_VALUES){

    $scope.downlines = [];
    $scope.downlineQueryFilter = undefined;

    // Variables privadas
    var showInvite = false;

    // Method to init the controller's default state
    $scope.initController = function(){

        $scope.$emit('setCurrentSection');

        // Obtenemos los downlines del usuario
        $scope.downlines = angular.copy(NetworkService.getAllDownlines());

    };

    $scope.invite = function () {
        var invitation = {
            user_id: 1,
            recipient_name: 'Luis Sánchez',
            recipient_email: 'luis.sanchez.franco@gmail.com'
        };

        InvitationService.sendInvitation(invitation);
    };

    $scope.isInviteView = function(){
        return showInvite;
    };

    $scope.showInviteView = function () {
        showInvite = true;
    };

    $scope.hideInviteView = function () {
        showInvite = false;
    };

    $scope.initController();

}]);