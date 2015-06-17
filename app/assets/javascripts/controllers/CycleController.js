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

    $scope.dataChart = {
        labels: [],
        data: [],
        colours: []
    };

    // Variables privadas
    var showInvite = false;
    var originalInvitation = angular.copy($scope.invitation);
    var hasTest = false;
    var chartColours = {
        blue: '#3169F5',
        yellow: '#F5EF2A',
        green: '#48A731',
        red: '#B2002F'
    };

    $scope.resetChartData = function () {
        $scope.dataChart = {
            labels: [],
            data: [],
            colours: []
        };
    };

    $scope.isEditingCycle = function () {
        return $scope.editCycle;
    };

    var isEmptyDownline = function(downline) {
        return downline && typeof downline.getId !== 'function';
    };

    $scope.isCurrentDownline = function(downline){
        return ($scope.currentDownline !== undefined)? ($scope.currentDownline == downline): false;
    };

    $scope.setCurrentDownline = function($event, downline){
        $event.preventDefault();
        $rootScope.$broadcast('hideAllDownlineLists');

        if($scope.currentDownline != downline) {
            if(!$scope.currentDownline){
                $scope.currentDownline = downline;
                (!isEmptyDownline(downline))? $scope.setChart(downline.getTestScores().colors): undefined;
            }else{
                if(isEmptyDownline(downline) || Object.keys($scope.currentDownline).length){
                    $scope.currentDownline = downline;
                    (!isEmptyDownline(downline))? $scope.setChart(downline.getTestScores().colors): undefined;
                }
            }
        } else {
            $scope.currentDownline = undefined;
        }

    };

    $scope.attachDownline = function(downline, downlinePosition){
        $scope.startSpin('container-spinner');
        NetworkService.attachDownline(downline, downlinePosition)
            .success(function(data){
                if(data.success){
                    $scope.downlinesNetworkList = angular.copy(NetworkService.downlinesNetworkList);
                    $scope.downlinesList = angular.copy(NetworkService.downlinesList);
                    $scope.stopSpin('container-spinner');
                }
            })
            .error(function(error){
                $scope.showAlert('Ocurrió un error al asignar el socio.', 'danger');
                console.log('Ocurrió un error al asignar el socio.');
            });
    };

    $scope.detachDownline = function(downline){
        $scope.startSpin('container-spinner');
        NetworkService.detachDownline(downline)
            .success(function(data){
                if(data.success){
                    $scope.downlinesNetworkList = angular.copy(NetworkService.downlinesNetworkList);
                    $scope.downlinesList = angular.copy(NetworkService.downlinesList);
                    $scope.stopSpin('container-spinner');
                }
            })
            .error(function(error){
                $scope.showAlert('Ocurrió un error al desasignar el socio.', 'danger');
                console.log('Ocurrió un error al desasignar el socio.');
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

            $scope.startSpin('container-spinner');
            var invitation = {
                user_id: SessionService.$get().getId(),
                recipient_name: $scope.invitation.recipient_name,
                recipient_email: $scope.invitation.recipient_email
            };

            InvitationService.sendInvitation(invitation).then(
                function(invitationFormMessage) {
                    $scope.invitationFormMessage = invitationFormMessage;
                    $scope.resetInvitationForm();
                    $scope.stopSpin('container-spinner');
                }
            );
        }
    };

    $scope.isInviteView = function(){
        return showInvite;
    };

    $scope.showInviteView = function ($event) {
        $event.stopPropagation();
        showInvite = true;
    };

    $scope.hideInviteView = function () {
        showInvite = false;
    };

    $scope.hasTestScores = function(downline){
        for(var key in downline.getTestScores()){
            if(key){
                hasTest = true;
                break;
            }
        }

        return hasTest;
    };

    $scope.setChart = function(testScores){
        $scope.resetChartData();

        angular.forEach(testScores, function (score) {
            $scope.dataChart.labels.push(score.description_spanish);
            $scope.dataChart.data.push(score.score);
            $scope.dataChart.colours.push(chartColours[score.description]);
        });
    };

    // Method to init the controller's default state
    $scope.initController = function(){

        $scope.$emit('setCurrentSection');

        $scope.sectionTitle = $scope.currentSubsection.title;

        $scope.startSpin('container-spinner');

        // Obtenemos toda la red del usuario
        NetworkService.getAllDownlines()
            .success(function(data){
                if(data.success){
                    $scope.downlinesNetworkList = angular.copy(NetworkService.downlinesNetworkList);
                    $scope.downlinesList = angular.copy(NetworkService.downlinesList);
                    $scope.stopSpin('container-spinner');
                }
            })
            .error(function(error){
                $scope.showAlert('Ocurrió un error al obtener tu red. Intenta nuevamente.', 'danger');
                console.log('Ocurrió un error al obtener tu red. Intenta nuevamente.');
            });

        $scope.currentUser = SessionService.$get();

    };

    $scope.initController();

}]);