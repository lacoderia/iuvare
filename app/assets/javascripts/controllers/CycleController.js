/*
 *   CycleController as cycleCtrl
 *   Description: Controller for Cycle section view
 * */

'use strict';

iuvare.controller('CycleController', ["$scope", "$rootScope", "$modal", "AuthService", "InvitationService", "NetworkService", "SessionService", "DEFAULT_VALUES", function($scope, $rootScope, $modal, AuthService, InvitationService, NetworkService, SessionService, DEFAULT_VALUES){

    $scope.DOWNLINE_LENGTH_LIMIT = DEFAULT_VALUES.DOWNLINE_LENGTH_LIMIT;

    $scope.downlinesList = [];
    $scope.downlinesNetworkList = [];
    $scope.sectionTitle = undefined;
    $scope.currentUser = undefined;
    $scope.currentDownline = undefined;

    // Object that holds the invitation values
    $scope.invitation = {
        recipient_name: undefined,
        recipient_email: ''
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

    var getListLength = function(list){
        var length = 0;
        angular.forEach(list, function(item){
            if(Object.keys(item).length > 0){
                length++;
            }
        });
        return length;
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

                    var successMessage = "";

                    switch(getListLength($scope.downlinesList)){
                        case 1:
                            successMessage = "¡Felicidades por tu primer socio, sigue adelante!";
                            break;
                        case 2:
                            successMessage = "¡Felicidades por tu segundo socio, sigue así!";
                            break;
                        case 3:
                            successMessage = "¡Felicidades por tu tercer socio, ya casi lo logras!";
                            break;
                        case 4:
                            successMessage = "¡Felicidades por tu cuarto socio, lo lograste!";
                            break;
                    }
                    $scope.showAlert(successMessage, 'success', false);
                    $scope.stopSpin('container-spinner');
                }
            })
            .error(function(error){
                $scope.showAlert('Ocurrió un error al asignar el socio.', 'danger', false);
                console.log('Ocurrió un error al asignar el socio.');
            });
    };

    $scope.confirmDetachDownline = function() {
        $scope.confirmDetachModal = $modal({
            backdrop: true,
            placement: 'center',
            prefixEvent: 'confirmDetachModal',
            scope: $scope,
            show: true,
            templateUrl: 'modal/cycle_confirm_delete_modal.tpl.html'
        });
    };

    $scope.detachDownline = function(){
        $scope.confirmDetachModal.hide();

        $scope.startSpin('container-spinner');

        NetworkService.detachDownline($scope.currentDownline)
            .success(function(data){
                if(data.success){
                    $scope.downlinesNetworkList = angular.copy(NetworkService.downlinesNetworkList);
                    $scope.downlinesList = angular.copy(NetworkService.downlinesList);
                    $scope.stopSpin('container-spinner')
                    $scope.currentDownline = undefined;
                }
            })
            .error(function(error){
                $scope.showAlert('Ocurrió un error al desasignar el socio.', 'danger', false);
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

            InvitationService.sendInvitation(invitation)
                .success(function(data){
                    if(data.success){
                        $scope.showAlert('Se envió un correo al socio con las instrucciones para ingresar.', 'success', false);
                    }
                })
                .error(function(error){
                    $scope.showAlert('Ocurrió un error al enviar el correo al socio con las instrucciones para ingresar. Intenta nuevamente.', 'danger', false);
                    console.log(error.error);
                })

                .finally(function() {
                    $scope.resetInvitationForm();
                    $scope.stopSpin('container-spinner');
                });
        }
    };

    $scope.isInviteView = function(){
        return showInvite;
    };

    $scope.showInviteView = function ($event) {
        $event.stopPropagation();
        $scope.resetInvitationForm();
        showInvite = true;
    };

    $scope.hideInviteView = function () {
        $scope.resetInvitationForm();
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
                $scope.showAlert('Ocurrió un error al obtener tu red. Intenta nuevamente.', 'danger', false);
                console.log('Ocurrió un error al obtener tu red. Intenta nuevamente.');
            });

        $scope.currentUser = SessionService.$get();

    };

    $scope.initController();

}]);
