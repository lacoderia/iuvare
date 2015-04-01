/*
 *   CycleController as cycleCtrl
 *   Description: Controller for Cycle section view
 * */

'use strict';

iuvare.controller('NetworkController', ["$scope", "$rootScope", "AuthService", "AsideMenuService", "NetworkService", "InvitationService", "DEFAULT_VALUES", function($scope, $rootScope, AuthService, AsideMenuService, NetworkService, InvitationService, DEFAULT_VALUES){

    $scope.downlines = [];

    $scope.downlineQueryFilter = undefined;


    // Method to init the controller's default state
    $scope.initController = function(){
        $scope.sectionTitle = DEFAULT_VALUES.BUSINESS_SUBSECTIONS[DEFAULT_VALUES.BUSINESS_SUBSECTIONS_POSITION.NETWORK].title;
        AsideMenuService.setCurrentSection(DEFAULT_VALUES.BUSINESS_SUBSECTIONS_POSITION.NETWORK);

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

    $scope.initController();
}]);