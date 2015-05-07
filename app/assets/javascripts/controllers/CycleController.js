/*
 *   CycleController as cycleCtrl
 *   Description: Controller for Cycle section view
 * */

'use strict';

iuvare.controller('CycleController', ["$scope", "$rootScope", "AuthService", "CycleService", "InvitationService", "NetworkService", "SessionService", "DEFAULT_VALUES", function($scope, $rootScope, AuthService, CycleService, InvitationService, NetworkService, SessionService, DEFAULT_VALUES){

    $scope.DOWNLINE_LENGTH_LIMIT = DEFAULT_VALUES.DOWNLINE_LENGTH_LIMIT;

    $scope.downlines = [];
    $scope.downlinesNetworkList = [];
    $scope.sectionTitle = undefined;
    $scope.currentUser = undefined;
    $scope.currentDownlineIndex = undefined;

    // Object that holds the invitation values
    $scope.invitation = {
        recipient_name: undefined,
        recipient_email: undefined
    };

    // Variables privadas
    var showInvite = false;
    var originalInvitation = angular.copy($scope.invitation);


    $scope.getDownlineLengthLimit = function(length){
      return new Array(length);
    };

    $scope.isEditingCycle = function () {
        return $scope.editCycle;
    };

    $scope.isCurrentDownline = function(downlineIndex){
        return ($scope.currentDownlineIndex !== undefined)?  ($scope.currentDownlineIndex == downlineIndex): false;
    };

    $scope.setCurrentDownline = function($event, downlineIndex){
        $event.preventDefault();
        $rootScope.$broadcast('hideAllDownlineLists');
        $scope.currentDownlineIndex = downlineIndex;
    };

    $scope.attachDownline = function(downlineIndex, downlinePosition){
        var downline = $scope.downlinesNetworkList[downlineIndex];
        CycleService.attachDownline(downlineIndex, downlinePosition, downline);
    };

    $scope.detachDownline = function(downlineIndex){
        CycleService.detachDownline(downlineIndex).then(function () {
            
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

        // Obtenemos los downlines del usuario
        CycleService.getDownlines().then(
            function(downlineList){
                $scope.downlines = angular.copy(downlineList);
            }
        );

        // Obtenemos toda la red del usuario
        NetworkService.getAllDownlines().then(
            function (downlineList) {
                $scope.downlinesNetworkList = angular.copy(downlineList);
            }
        );

        $scope.currentUser = SessionService.$get();
        //console.log("ENTRE AL CONTROLADOR DEL CICLO")
        //console.log(SessionService.$get().getLastName())
        //$scope.currentUserName = SessionService.$get().getFirstName() + " " + SessionService.$get().getLastName();

    };

    $scope.initController();

}]);