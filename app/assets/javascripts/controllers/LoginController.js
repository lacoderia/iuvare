/*
 *   LoginController as loginCtrl
 *   Description: Controller for signup, login and logout views
 * */

'use strict';

iuvare.controller('LoginController', ["$scope", "$rootScope", "$location", "AuthService", "InvitationService", function($scope, $rootScope, $location, AuthService, InvitationService){

    // Object that holds
    $scope.VIEW = {
        LOGIN: 0,
        FORGOT: 1
    };

    // Object that holds the three possible login tab views
    $scope.LOGIN_VIEW = {
        SIGNIN: 0,
        SIGNUP: 1,
        REQUEST: 2
    };

    // Object that holds the three possible login tab views
    $scope.FORGOT_VIEW = {
        FORGOT: 0,
        RESET: 1
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

    // Object that holds new request parameters
    $scope.request = {
        premier: undefined,
        name: undefined,
        email: undefined,
        message: undefined
    };

    // Object that holds the recover password data
    $scope.forgot = {
        email: undefined
    };

    // Object that holds the recover password data
    $scope.reset = {
        token: undefined,
        password: undefined,
        confirmation: undefined
    };

    // Variables privadas
    var originalRequest = angular.copy($scope.request);
    var originalForgot = angular.copy($scope.forgot);
    var originalReset = angular.copy($scope.reset);

    // Array that holds the premiers listing
    $scope.premierDropdown = [];
    $scope.premiers = [
        {id: 1, name:'Rodrigo García'}
    ];

    angular.forEach($scope.premiers, function (premier, index) {
        $scope.premierDropdown.push({
            text: premier.name,
            click: 'setPremier(' + index + ')'
        });
    });

    $scope.invitationToken = undefined;
    $scope.loginFormMessage = '';
    $scope.signupFormMessage = '';

    // Method to init the controller's default state
    $scope.initController = function(){
        $scope.invitationToken = $location.search().token;
        ($scope.invitationToken)? $scope.currentLoginView = $scope.LOGIN_VIEW.SIGNUP : $scope.currentLoginView = $scope.LOGIN_VIEW.SIGNIN;

        $scope.reset.token = $location.search().reset_password_token;
        if ($scope.reset.token) {
            $scope.currentView = $scope.VIEW.FORGOT;
            $scope.currentForgotView = $scope.FORGOT_VIEW.RESET
        } else {
            $scope.currentView = $scope.VIEW.LOGIN;
        }
    };

    // Method that returns if the parameter view is the current view
    $scope.isCurrentView = function(view){
        return (view == $scope.currentView);
    };

    // Method that toggles to login view
    $scope.showLoginView = function () {
        $scope.currentView = $scope.VIEW.LOGIN;
        $scope.currentLoginView = $scope.LOGIN_VIEW.SIGNIN;
    };

    // Method that toggles to forgot view
    $scope.showForgotView = function () {
        $scope.currentView = $scope.VIEW.FORGOT;
        $scope.currentForgotView = $scope.FORGOT_VIEW.FORGOT;
    };

    // Method that returns if the parameter view is the current forgot view
    $scope.isCurrentForgotView = function (view) {
        return (view == $scope.currentForgotView);
    };

    // Method that returns if the parameter view is the current login view
    $scope.isCurrentLoginView = function (view) {
        return (view == $scope.currentLoginView);
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

    // Method that sets the selected premier on the dropdown
    $scope.setPremier = function(index){
        if ($scope.request) {
            $scope.request.premier = $scope.premiers[index];
        }
    };

    // Method that resets the invitation request form
    $scope.resetRequestForm = function(){
        $scope.request = angular.copy(originalRequest);
        $scope.requestForm.$setPristine();
        $scope.requestForm.$setUntouched();
    };

    // Method that sends an invitation request
    $scope.sendRequest = function(){
        if($scope.requestForm.$valid){

            var request = {
                user_id: $scope.request.premier.id,
                source_name: $scope.request.name,
                source_email: $scope.request.email,
                source_text: $scope.request.message
            };

            InvitationService.sendRequest(request)
                .then(
                function(requestFormMessage) {
                    $scope.requestFormMessage = requestFormMessage;
                    $scope.resetRequestForm();
                }
            );
        }
    };

    // Method that resets the password recovery form
    $scope.resetForgotForm = function(){
        $scope.forgot = angular.copy(originalForgot);
        $scope.forgotForm.$setPristine();
        $scope.forgotForm.$setUntouched();
    };

    // Method that sends a password recovery mail
    $scope.recoverPassword = function () {
        if($scope.forgotForm.$valid){
            AuthService.recoverPassword($scope.forgot)
                .then(
                function(forgotFormMessage) {
                    $scope.forgotFormMessage = forgotFormMessage;
                    $scope.resetForgotForm();
                }
            );
        }
    };

    // Method that resets the password reset form
    $scope.resetResetForm = function(){
        $scope.reset = angular.copy(originalReset);
        $scope.resetForm.$setPristine();
        $scope.resetForm.$setUntouched();
    };

    // Method that sends a password recovery mail
    $scope.resetPassword = function () {
        if($scope.resetForm.$valid){
            AuthService.resetPassword($scope.reset)
                .then(
                function(resetFormMessage) {
                    $scope.resetFormMessage = resetFormMessage;
                    $scope.resetResetForm();
                }
            );
        }
    };

    $scope.initController();

}]);