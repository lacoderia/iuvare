'use strict';

iuvare.controller('ListController', ["$scope", "$rootScope", "AuthService", "SessionService", "DEFAULT_VALUES", function($scope, $rootScope, AuthService, SessionService, DEFAULT_VALUES){

    // Method to init the controller's default state
    $scope.initController = function(){

        $scope.$emit('setCurrentSection');

        $scope.sectionTitle = $scope.currentSubsection.title;


    };

    $scope.initController();

}]);
