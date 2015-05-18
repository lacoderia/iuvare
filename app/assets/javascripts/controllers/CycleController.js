/*
 *   CycleController as cycleCtrl
 *   Description: Controller for Cycle section view
 * */

'use strict';

iuvare.controller('CycleController', ["$scope", "$rootScope", "AuthService", "InvitationService", "NetworkService", "SessionService", "DEFAULT_VALUES", function($scope, $rootScope, AuthService, InvitationService, NetworkService, SessionService, DEFAULT_VALUES){

    $scope.DOWNLINE_LENGTH_LIMIT = DEFAULT_VALUES.DOWNLINE_LENGTH_LIMIT;

    $scope.downlinesList = [];
    $scope.downlinesNetworkList = [];
    $scope.sectionTitle = undefined;
    $scope.currentUser = undefined;
    $scope.currentDownline = undefined;

    // Object that holds the invitation values
    $scope.invitation = {
        recipient_name: undefined,
        recipient_email: undefined
    };

    // Variables privadas
    var showInvite = false;
    var originalInvitation = angular.copy($scope.invitation);

    $scope.isEditingCycle = function () {
        return $scope.editCycle;
    };

    $scope.isCurrentDownline = function(downline){
        return ($scope.currentDownline !== undefined)? ($scope.currentDownline == downline): false;
    };

    $scope.setCurrentDownline = function($event, downline){
        $event.preventDefault();
        $rootScope.$broadcast('hideAllDownlineLists');
        $scope.currentDownline = downline;
    };

    $scope.attachDownline = function(downline, downlinePosition){
        NetworkService.attachDownline(downline, downlinePosition)
            .success(function(data){
                if(data.success){
                    $scope.downlinesNetworkList = angular.copy(NetworkService.downlinesNetworkList);
                    $scope.downlinesList = angular.copy(NetworkService.downlinesList);
                }
            });
    };

    $scope.detachDownline = function(downline){
        NetworkService.detachDownline(downline)
            .success(function(data){
                if(data.success){
                    $scope.downlinesNetworkList = angular.copy(NetworkService.downlinesNetworkList);
                    $scope.downlinesList = angular.copy(NetworkService.downlinesList);
                }
            });
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
            );
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

    // Method to init the controller's default state
    $scope.initController = function(){

        $scope.$emit('setCurrentSection');

        $scope.sectionTitle = $scope.currentSubsection.title;


        // Obtenemos toda la red del usuario
        NetworkService.getAllDownlines()
            .success(function(data){
                if(data.success){
                    $scope.downlinesNetworkList = angular.copy(NetworkService.downlinesNetworkList);
                    $scope.downlinesList = angular.copy(NetworkService.downlinesList);
                }
            });

        $scope.currentUser = SessionService.$get();

    };

    $scope.initController();

}]);