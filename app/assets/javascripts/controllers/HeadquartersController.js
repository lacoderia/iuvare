'use strict';

iuvare.controller('HeadquartersController', ["$scope", "$log", "$rootScope", "AuthService", "ListService", "SessionService", "DEFAULT_VALUES", function($scope, $log, $rootScope, AuthService, ListService, SessionService, DEFAULT_VALUES){

    // Method to init the controller's default state
    $scope.initController = function(){
        $scope.$emit('setCurrentSection');
    };

    $scope.initController();

}]);
