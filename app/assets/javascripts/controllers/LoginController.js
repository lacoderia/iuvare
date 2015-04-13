/*
 *   LoginController as loginCtrl
 *   Description: Controller for signup, login and logout views
 * */

'use strict';

iuvare.controller('LoginController', ["$scope", "$rootScope", "$location", "AuthService", function($scope, $rootScope, $location, AuthService){

    $scope.VIEW = {
        SIGNIN: 0,
        SIGNUP: 1
    };

    // Object that holds the username and password values
    $scope.credentials = {
        email: undefined,
        password: undefined
    };

    // Object that holds new user parameters
    $scope.newUser = {
        firstName: undefined,
        lastName: undefined,
        email: undefined,
        password: undefined,
        passwordConfirm: undefined,
        iuvareId: undefined,
        xangoId: undefined,
        sponsorIuvareId: undefined,
        sponsorXangoId: undefined,
        placementIuvareId: undefined,
        placementXangoId: undefined
    };

    $scope.invitationToken = undefined;
    $scope.loginFormMessage = '';
    $scope.signupFormMessage = '';

    // Method to init the controller's default state
    $scope.initController = function(){
        $scope.invitationToken = $location.search().token;
        ($scope.invitationToken)? $scope.currentView = $scope.VIEW.SIGNUP : $scope.currentView = $scope.VIEW.SIGNIN;
    };

    // Method to authenticate a user
    $scope.signIn = function () {
        if($scope.loginForm.$valid){
            AuthService.signIn($scope.credentials)
                .then(
                function(loginFormMessage) {
                    $scope.loginFormMessage = loginFormMessage;
                }
            );
        }
    };

    // Method to register a new user
    $scope.signUp = function () {
        if($scope.invitationToken){
            if($scope.signupForm.$valid){

                var user = {
                    first_name: $scope.newUser.firstName,
                    last_name: $scope.newUser.lastName,
                    email: $scope.newUser.email,
                    password: $scope.newUser.password,
                    password_confirmation: $scope.newUser.passwordConfirm,
                    xango_id: $scope.newUser.xangoId,
                    iuvare_id: $scope.newUser.iuvareId,
                    sponsor_xango_id: $scope.newUser.sponsorXangoId,
                    sponsor_iuvare_id: $scope.newUser.sponsorIuvareId,
                    placement_xango_id: $scope.newUser.placementXangoId,
                    placement_iuvare_id: $scope.newUser.placementIuvareId
                };

                AuthService.signUp(user, $scope.invitationToken)
                    .then(
                    function(signupFormMessage) {
                        $scope.signupFormMessage = signupFormMessage;
                    }
                );
            }
        }else{
            $scope.signupFormMessage = 'Para poder registrarte es necesario que recibas una invitación previa.';
        }
    };

    // Method that returns if the parameter view is the current view
    $scope.isCurrentView = function (view) {
        return (view == $scope.currentView);
    };

    $scope.initController();

}]);