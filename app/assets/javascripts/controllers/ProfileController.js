/*
 *   ProfileController as profileCtrl
 *   Description: Controller for Profile section view
 * */

'use strict';

iuvare.controller('ProfileController', ["$scope", "$rootScope", "AuthService", "TestService", "SessionService", "DEFAULT_VALUES", function($scope, $rootScope, AuthService, TestService, SessionService, DEFAULT_VALUES){

    $scope.TEST_CODES = DEFAULT_VALUES.TEST_CODES;

    // Array that holds the user's goals list
    $scope.colorTestResult = undefined;

    // Object that holds the test questions and answers
    $scope.colorTest = undefined;

    // Variables privadas
    $scope.showTest = false;

    // Method that shows the new goal form
    $scope.showTestForm = function(){
        $scope.showTest = true;
    };

    // Method that hides the new goal form
    $scope.hideTestForm = function(){
        $scope.showTest = false;
    };

    $scope.createTest = function(){

        TestService.getTestByCode($scope.TEST_CODES.COLOR)
            .success(function(data){
                $scope.colorTest = data;
                $scope.showTestForm();

                console.log($scope.colorTest);
            })
            .error(function(error, status){

            });

    };

    // Method that saves a new goal
    $scope.saveTest = function(){
        if ($scope.testForm.$valid) {

        }
    };

    // Method to init the controller's default state
    $scope.initController = function(){

        console.log('InitController')

        $scope.$emit('setCurrentSection');

        $scope.sectionTitle = $scope.currentSubsection.title;

        // Obtenemos las metas del usuario
        TestService.getTestResultByCode($scope.TEST_CODES.COLOR)
            .success(function(data){
                if(data.success && data.result){
                    $scope.colorTestResult = data.result;
                } else {
                    $scope.colorTestResult = {};
                }
            })
            .error(function (error, status) {
                console.log('Hubo un error al obtener los resultados del test de color.');
            });

    };

    $scope.initController();
}]);
