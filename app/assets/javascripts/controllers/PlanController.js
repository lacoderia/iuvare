/**
 * Created by Owen on 08/05/15.
 */
'use strict';

iuvare.controller('PlanController', ["$scope", "$location", "$rootScope", "$sce", "$timeout", "ListService", "TestService", "DEFAULT_VALUES", function($scope, $location, $rootScope, $sce, $timeout, ListService, TestService, DEFAULT_VALUES){

    //Private variables
    var planToken = undefined;
    var tokenSent = false;
    var validToken = false;
    var videoEnded = false;
    var testSent = false;
    var rangeLimit = 10;

    //Public variables
    $scope.ASSET_PATH = DEFAULT_VALUES.ASSETS.PATH;
    $scope.plan = undefined;
    $scope.asset = undefined;
    $scope.test = undefined;
    $scope.testAnswers = {
        interest: undefined,
        contactTime: undefined
    };
    $scope.answers = undefined;

    $scope.testForm = {};

    var triggerTest = function () {

        ListService.videoEnded($scope.plan.id)
            .success(function (data) {

            })
            .error(function (error, status) {
                $scope.showAlert('Ocurrió un error al terminar el video.', 'danger', false);
                console.log('Ocurrió un error al terminar el video');
            });

        $scope.startSpin('container-spinner');

        TestService.getTestByCode(DEFAULT_VALUES.TEST_CODES.PLAN)
            .success(function (data) {
                if(data.success){
                    $scope.test = data.result;
                    $scope.stopSpin('container-spinner');
                }
            })
            .error(function (error, status) {
                $scope.showAlert('Ocurrió un error al obtener el test.', 'danger', false);
                console.log('Ocurrió un error al obtener el test.');
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

                    $scope.asset.config = {
                        preload: "none",
                        sources : [
                            {src: $sce.trustAsResourceUrl($scope.asset.stream_url + ".mp4"), type: "video/mp4"},
                            {src: $sce.trustAsResourceUrl($scope.asset.stream_url + ".webm"), type: "video/webm"},
                            //{src: $sce.trustAsResourceUrl(DEFAULT_VALUES.ASSETS.PATH + $scope.asset.source + '.ogg'), type: "video/ogg"}
                        ],
                        theme : "/assets/bower_components/videogular-themes-default/videogular.css"
                    };

                    validToken = true;
                }
            })
            .error(function (error, status) {
                validToken = false;

                $scope.showAlert('Ocurrió un error al cargar el video.', 'danger', false);
                console.log('Ocurrió un error al cargar el video.');
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

    $scope.onComplete = function () {
        $timeout(function () {
            videoEnded = true;
            triggerTest();
        },500);
    };

    $scope.getRangeLimit = function () {
        return new Array(rangeLimit);
    };

    $scope.sendTest = function () {

        if ($scope.testForm.form.$valid) {
            $scope.startSpin('container-spinner');

            var contactId = $scope.plan.contact.id;
            var userId = $scope.plan.user_id;
            ListService.gradeTest($scope.testAnswers, contactId, userId)
                .success(function (data) {
                    testSent = true;
                    $scope.answers = data.result;
                    $scope.stopSpin('container-spinner');
                })
                .error(function (error,status) {
                    $scope.showAlert('Ocurrió un error al guardar los resultado del test. Intenta nuevamente.', 'danger', false);
                    console.log('Ocurrió un error al guardar los resultado del test. Intenta nuevamente.')
                });
        } else {
            $scope.showAlert('Todas las preguntas deben tener una respuesta seleccionada.', 'warning');
        }

    };

    $scope.initController();

}]);
