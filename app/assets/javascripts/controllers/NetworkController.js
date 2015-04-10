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

        console.log()

    };

    $scope.invite = function () {
        var invitation = {
            user_id: SessionService.getId(),
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