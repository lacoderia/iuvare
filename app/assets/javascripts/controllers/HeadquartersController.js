'use strict';

iuvare.controller('HeadquartersController', ["$scope", "$log", "$rootScope", "AuthService", "OfficeService", function($scope, $log, $rootScope, AuthService, OfficeService){

    // Array that holds the offices list
    $scope.officesList = undefined;

    // Method that toggles office's detail
    $scope.toggleOfficeInfo = function(officeItem){
        angular.forEach($scope.officesList, function(office){
            if(officeItem.id != office.id){
                office.showInfo = false;
            }else{
                if(office.showInfo){
                    office.showInfo = false;
                }else{
                    office.showInfo = true;
                }
            }
        });
    };

    // Method to init the controller's default state
    $scope.initController = function(){
        $scope.$emit('setCurrentSection');

        $scope.sectionTitle = $scope.currentSubsection.title;

        $scope.startSpin('container-spinner');

        // Obtenemos las sedes de Iuvare
        OfficeService.getOffices()
            .success(function(data){
                if(data.success){
                    $scope.officesList = OfficeService.offices;

                    angular.forEach($scope.officesList, function(office, i){
                        office.map = {
                            center: {
                                latitude: office.latitude,
                                longitude: office.longitude
                            },
                            marker: {
                                id: i,
                                coords: {
                                    latitude: office.latitude,
                                    longitude: office.longitude
                                }
                            },
                            zoom: 16,
                            options: {
                                disableDefaultUI: true
                            }
                        };

                        office.showInfo = false;
                    });

                    $scope.stopSpin('container-spinner');
                }
            })
            .error(function (error, status) {
                $scope.showAlert('Ocurrió un error al obtener las sedes. Intenta nuevamente.', 'danger');
                console.log('Ocurrió un error al obtener las sedes.');
            });

    };

    $scope.initController();

}]);
