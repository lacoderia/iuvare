'use strict';

iuvare.controller('HeadquartersController', ["$scope", "$log", "$rootScope", "AuthService", "OfficeService", "SessionService", "DEFAULT_VALUES", function($scope, $log, $rootScope, AuthService, OfficeService, SessionService, DEFAULT_VALUES){

    // Array that holds the offices list
    $scope.officesList = undefined;

    // Method to init the controller's default state
    $scope.initController = function(){
        $scope.$emit('setCurrentSection');

        // Obtenemos las sedes de Iuvare
        OfficeService.getOffices()
            .success(function(data){
                if(data.success){
                    $scope.goalsList = OfficeService.goals;
                }

                $scope.updateGoalsDropdown();
            })
            .error(function (error, status) {
                console.log('Hubo un error al obtener las metas.');
            });

    };

    $scope.initController();

}]);
