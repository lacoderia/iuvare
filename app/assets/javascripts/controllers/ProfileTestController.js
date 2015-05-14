/*
 *   ProfileController as profileCtrl
 *   Description: Controller for Profile section view
 * */

'use strict';

iuvare.controller('ProfileTestController', ["$scope", "$rootScope", "$timeout", "AuthService", "TestService", "SessionService", "UserService", "DEFAULT_VALUES", function($scope, $rootScope, $timeout, AuthService, TestService, SessionService, UserService, DEFAULT_VALUES){

    $scope.TEST_CODES = DEFAULT_VALUES.TEST_CODES;
    var chartColours = {
        blue: '#3169F5',
        yellow: '#F5EF2A',
        green: '#48A731',
        red: '#B2002F'
    };

    // Array that holds the user's goals list
    $scope.colorTestResult = undefined;
    $scope.dataChart = {
        labels: [],
        data: [],
        colours: []
    };

    // Object that holds the test questions and answers
    $scope.colorTest = undefined;

    // Variables privadas
    $scope.showTest = false;
    $scope.testFormMessage = undefined;
    var chartLoaded = false;

    // Method that shows the new goal form
    $scope.showTestForm = function(){
        $scope.showTest = true;
        chartLoaded = true;
    };

    // Method that hides the new goal form
    $scope.hideTestForm = function(){
        $scope.resetTestForm();
        $scope.showTest = false;
        chartLoaded = false;
    };

    $scope.isChartLoaded = function(){
        return chartLoaded;
    };

    $scope.createTest = function(){

        TestService.getTestByCode($scope.TEST_CODES.COLOR)
            .success(function(data){
                if(data.success){
                    $scope.colorTest = data.result;
                    $scope.showTestForm();
                } else {
                    console.log(data.error);
                }

            })
            .error(function(error, status){
                console.log('Hubo un error al obtener los resultados del test de color.');
            });

    };

    // Method that resets the test form
    $scope.resetTestForm = function(){
        $scope.colorTest = undefined;
        $scope.testFormMessage = undefined;
        $scope.testForm.$setPristine();
        $scope.testForm.$setUntouched();
    };

    $scope.setChart = function(testScores){
        $scope.dataChart.labels = [];
        $scope.dataChart.data = [];

        angular.forEach(testScores, function (score) {
            $scope.dataChart.labels.push(score.description);
            $scope.dataChart.data.push(score.score);
            $scope.dataChart.colours.push(chartColours[score.description]);
        });

        $timeout(function(){
            chartLoaded = true;
        },0);
    };

    // Method that saves a new goal
    $scope.gradeTest = function(){

        if ($scope.testForm.$valid) {

            var answers = [];

            angular.forEach($scope.colorTest.questions, function(question){
                var question = {
                    id: question.selectedAnswer
                };
                answers.push(question)
            });

            TestService.gradeTest($scope.TEST_CODES.COLOR, answers)
                .success(function(data){
                    if(data.success){
                        $scope.colorTestResult = data.result;
                        $scope.hideTestForm();
                        $scope.setChart($scope.colorTestResult.test_scores);
                    } else {
                        $scope.testFormMessage = data.error;
                    }
                })
                .error(function(error, status){
                    console.log(error.error);
                    $scope.testFormMessage = error.error;
                });
        } else {
            $scope.testFormMessage = 'Todas las preguntas deben tener una respuesta seleccionada.';
        }
    };

    // Method to init the controller's default state
    $scope.initController = function(){
        $scope.$emit('setCurrentSection');

        $scope.sectionTitle = $scope.currentSubsection.title;

        // Obtenemos las metas del usuario
        TestService.getTestResultByCode($scope.TEST_CODES.COLOR)
            .success(function(data){
                if(data.success){
                    $scope.colorTestResult = data.result;
                    $scope.setChart($scope.colorTestResult.test_scores);

                } else {
                    $scope.colorTestResult = {};
                    console.log(data.error);
                }
            })
            .error(function (error, status) {
                console.log('Hubo un error al obtener los resultados del test de color.');
            });

    };

    $scope.initController();
}]);
