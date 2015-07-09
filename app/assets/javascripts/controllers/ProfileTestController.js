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

    // Holds the main color
    $scope.mainColorDesc = undefined;

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

        $scope.startSpin('container-spinner');

        TestService.getTestByCode($scope.TEST_CODES.COLOR)
            .success(function(data){
                if(data.success){
                    $scope.colorTest = data.result;
                    $scope.showTestForm();
                } else {
                    console.log(data.error);
                }
                $scope.stopSpin('container-spinner');
            })
            .error(function(error, status){
                $scope.showAlert('Ocurrió un error al obtener los resultados del test de color. Intenta nuevamente.', 'danger', false);
                console.log('Ocurrió un error al obtener los resultados del test de color.');
            });

    };

    // Method that resets the test form
    $scope.resetTestForm = function(){
        $scope.colorTest = undefined;
        $scope.testForm.$setPristine();
        $scope.testForm.$setUntouched();
    };

    $scope.setChart = function(testScores){
        $scope.dataChart.labels = [];
        $scope.dataChart.data = [];

        angular.forEach(testScores, function (score) {
            $scope.dataChart.labels.push(score.description_spanish);
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

            $scope.startSpin('container-spinner');

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
                        $scope.colorTestResult.scores = $scope.colorTestResult.test_scores;
                        SessionService.$get().setTestScores([$scope.colorTestResult]);
                    } else {
                        $scope.showAlert(data.error, 'danger', false);
                    }

                    $scope.stopSpin('container-spinner');
                })
                .error(function(error, status){
                    $scope.showAlert(error.error, 'danger', false);
                    console.log(error.error);
                });
        } else {
            $scope.showAlert('Todas las preguntas deben tener una respuesta seleccionada.', 'warning');
        }
    };

    var getMainColor = function(){
        var maxScoreColor = $scope.colorTestResult.test_scores[0];
        angular.forEach($scope.colorTestResult.test_scores, function(score){
            if(score.score > maxScoreColor.score){
                maxScoreColor = score;
            }
        });
        return maxScoreColor;
    };

    // Method to init the controller's default state
    $scope.initController = function(){
        $scope.$emit('setCurrentSection');

        $scope.sectionTitle = $scope.currentSubsection.title;

        $scope.startSpin('container-spinner');

        // Obtenemos las metas del usuario
        TestService.getTestResultByCode($scope.TEST_CODES.COLOR)
            .success(function(data){
                if(data.result){
                    if(data.success){
                        $scope.colorTestResult = data.result;
                        $scope.setChart($scope.colorTestResult.test_scores);
                        $scope.mainColorDesc = DEFAULT_VALUES.COLOR_DESC[(getMainColor().description).toUpperCase()];

                    } else {
                        $scope.colorTestResult = {};
                        $scope.showAlert(data.error, 'danger', false);
                        console.log(data.error);
                    }
                } else {
                    $scope.colorTestResult = {};
                    console.log(data.error);
                }

                $scope.stopSpin('container-spinner');
            })
            .error(function (error, status) {
                $scope.showAlert('Ocurrió un error al obtener los resultados del test de color. Intenta nuevamente.', 'danger', false);
                console.log('Ocurrió un error al obtener los resultados del test de color.');
            });

    };

    $scope.initController();
}]);
