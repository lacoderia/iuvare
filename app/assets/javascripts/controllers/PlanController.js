/**
 * Created by Owen on 08/05/15.
 */
'use strict';

iuvare.controller('PlanController', ["$scope", "$location", "$rootScope", "$timeout", "ListService", "TestService", "DEFAULT_VALUES", function($scope, $location, $rootScope, $timeout, ListService, TestService, DEFAULT_VALUES){

    //Private variables
    var planToken = undefined;
    var tokenSent = false;
    var validToken = false;
    var videoEnded = false;
    var testSent = false;
    var rangeLimit = 10;

    //Public variables
    $scope.ASSET_PATH = DEFAULT_VALUES.ASSET_PATHS.PLAN;
    $scope.plan = undefined;
    $scope.asset = undefined;
    $scope.test = undefined;
    $scope.testAnswers = {
        interest: undefined,
        contactTime: undefined
    };
    $scope.answers = undefined;

    var triggerTest = function () {

        ListService.videoEnded($scope.plan.id)
            .success(function (data) {

            })
            .error(function (error, status) {
                console.log('Ocurrió un error al terminar el video');
                console.log(error)
            });

        TestService.getTestByCode(DEFAULT_VALUES.TEST_CODES.PLAN)
            .success(function (data) {
                if(data.success){
                    $scope.test = data.result;
                }
            })
            .error(function (error, status) {
                console.log('Ocurrió un error al obtener el test');
                console.log(error)
            });

    };

    // Method to init the controller's default state
    $scope.initController = function(){
        planToken = $location.search().token;
        ListService.watchVideo(planToken)
            .success(function (data) {
                if(data.success){
                    $scope.plan = data.result;
                    $scope.asset = $scope.plan.asset;
                    validToken = true;
                }
            })
            .error(function (error, status) {
                console.log('Ocurrió un error al cargar el video');
                console.log(error)
                validToken = false;
            })
            .finally(function () {
                tokenSent = true;
            });
    };

    $scope.isTokenSent = function () {
        return tokenSent;
    };

    $scope.isValidToken = function () {
        return validToken;
    };

    $scope.hasVideoEnded = function(){
        return videoEnded;
    };

    $scope.hasTestSent = function () {
        return testSent;
    };

    $scope.onended = function () {
        $timeout(function () {
            videoEnded = true;
            triggerTest();
        },500);
    };

    $scope.getRangeLimit = function () {
        return new Array(rangeLimit);
    };

    $scope.sendTest = function () {
        var contactId = $scope.plan.contact.id;
        var userId = $scope.plan.user_id;
        ListService.gradeTest($scope.testAnswers, contactId, userId)
            .success(function (data) {
                testSent = true;
                $scope.answers = data.result;
                console.log($scope.answers);
            })
            .error(function (error,status) {
                console.log('Ocurrió un error al guardar los resultado del test')
                console.log(error);
            });
    };

    $scope.initController();

}]);
