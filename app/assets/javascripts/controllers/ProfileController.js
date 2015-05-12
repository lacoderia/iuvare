/*
 *   ProfileController as profileCtrl
 *   Description: Controller for Profile section view
 * */

'use strict';

iuvare.controller('ProfileController', ["$scope", "$rootScope", "AuthService", "TestService", "SessionService", "UserService", "DEFAULT_VALUES", function($scope, $rootScope, AuthService, TestService, SessionService, UserService, DEFAULT_VALUES){

    $scope.TEST_CODES = DEFAULT_VALUES.TEST_CODES;

    // Array that holds the user's goals list
    $scope.colorTestResult = undefined;

    // Object that holds the test questions and answers
    $scope.colorTest = undefined;

    // Variables privadas
    $scope.showTest = false;
    $scope.testFormMessage = undefined;

    // Method that shows the new goal form
    $scope.showTestForm = function(){
        $scope.showTest = true;
    };

    // Method that hides the new goal form
    $scope.hideTestForm = function(){
        $scope.resetTestForm();
        $scope.showTest = false;
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



    // PROFILE

    $scope.currentUser = {
        name: undefined,
        lastName: undefined,
        email: undefined,
        iuvareId: undefined,
        xangoId: undefined
    };

    $scope.openProfilePictureSelector = function(event) {
        $(event.target).siblings('input').trigger('click');
        return false;
    };

    $scope.selectProfilePicture = function(element) {
        var input = $(element);
        if (input[0].files && input[0].files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                var imageContainer = $(element).parents('.profile-form').find('.picture');
                var image = imageContainer.find('img');
                image.attr('src', e.target.result);
                $scope.currentUser.picture = e.target.result;

                var loadedImage = new Image();
                loadedImage.src = reader.result;

                var ratio = loadedImage.width / loadedImage.height;

                // Si la imagen es horizontal, el alto debe ser el del contenedor y el ancho debe ser proporcional
                if (loadedImage.width > loadedImage.height) {
                    image.height(imageContainer.height());
                    image.width(imageContainer.height() * ratio);
                } else {
                    // Si la imagen es vertical o cuadrada, el ancho debe ser el del contenedor y el alto debe ser proporcional
                    image.width(imageContainer.width());
                    image.height(imageContainer.width() / ratio);
                }

            };

            reader.readAsDataURL(input[0].files[0]);
        }
    };

    $scope.updateProfile = function() {
        if ($scope.profileForm.$valid) {

            var user = $scope.currentUser;

            ProfileService.submitWeekCalendar(weekCalendar)
                .success(function (data) {

                })
                .error(function (response) {

                });

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
                } else {
                    $scope.colorTestResult = {};
                    console.log(data.error);
                }
            })
            .error(function (error, status) {
                console.log('Hubo un error al obtener los resultados del test de color.');
            });

        $scope.currentUser = {
            name: SessionService.$get().getFirstName(),
            lastName: SessionService.$get().getLastName(),
            email: SessionService.$get().getEmail(),
            iuvareId: SessionService.$get().getIuvareId(),
            xangoId: SessionService.$get().getXangoId()
        };

    };

    $scope.initController();
}]);
