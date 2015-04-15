/*
 *   CycleController as cycleCtrl
 *   Description: Controller for Cycle section view
 * */

'use strict';

iuvare.controller('NetworkController', ["$scope", "$rootScope", "AuthService", "NavigationService", "NetworkService", "InvitationService", "SessionService", "DEFAULT_VALUES", function($scope, $rootScope, AuthService, NavigationService, NetworkService, InvitationService, SessionService, DEFAULT_VALUES){

    $scope.downlines = [];
    $scope.downlineQueryFilter = undefined;
    $scope.sectionTitle = undefined;

    // Object that holds the invitation values
    $scope.invitation = {
        recipient_name: undefined,
        recipient_email: undefined
    };

    // Variables privadas
    var showInvite = false;
    var originalInvitation = angular.copy($scope.invitation);

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

    // Method that resets the invitation form
    $scope.resetInvitationForm = function(){
        $scope.invitation = angular.copy(originalInvitation);
        $scope.invitationForm.$setPristine();
        $scope.invitationForm.$setUntouched();
    };

    $scope.invite = function () {
        if ($scope.invitationForm.$valid) {
            var invitation = {
                user_id: SessionService.$get().getId(),
                recipient_name: $scope.invitation.recipient_name,
                recipient_email: $scope.invitation.recipient_email
            };

            InvitationService.sendInvitation(invitation).then(
                function(invitationFormMessage) {
                    $scope.invitationFormMessage = invitationFormMessage;
                    $scope.resetInvitationForm();
                }
            );;
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