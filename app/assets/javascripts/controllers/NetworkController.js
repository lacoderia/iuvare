/*
 *   CycleController as cycleCtrl
 *   Description: Controller for Cycle section view
 * */

'use strict';

iuvare.controller('NetworkController', ["$scope", "$rootScope", "AuthService", "NavigationService", "NetworkService", "InvitationService", "SessionService", "DEFAULT_VALUES", function($scope, $rootScope, AuthService, NavigationService, NetworkService, InvitationService, SessionService, DEFAULT_VALUES){

    $scope.downlines = [];
    $scope.downlineQueryFilter = undefined;
    $scope.sectionTitle = undefined;

    // Variables privadas
    var showInvite = false;

    // Method to init the controller's default state
    $scope.initController = function(){

        $scope.$emit('setCurrentSection');

        $scope.sectionTitle = $scope.currentSubsection.title;

        // Obtenemos los downlines del usuario
        NetworkService.getAllDownlines().then(
            function(downlineList){
                $scope.downlines = downlineList;
            }
        );


    };

    $scope.invite = function () {
        if ($scope.invitationForm.$valid) {
            var invitation = {
                user_id: SessionService.$get().getId(),
                recipient_name: $scope.invitation.recipient_name,
                recipient_email: $scope.invitation.recipient_email
            };

            InvitationService.sendInvitation(invitation);
        }
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