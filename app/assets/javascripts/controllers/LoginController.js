/*
 *   LoginController as loginCtrl
 *   Description: Controller for signup, login and logout views
 * */

'use strict';

iuvare.controller('LoginController', ["$scope", "$rootScope", "$location", "AuthService", "InvitationService", "XangoUserService", function($scope, $rootScope, $location, AuthService, InvitationService, XangoUserService){

    // Object that holds
    $scope.VIEW = {
        LOGIN: 0,
        FORGOT: 1
    };

    // Object that holds the three possible login tab views
    $scope.LOGIN_VIEW = {
        SIGNIN: 0,
        SIGNUP: 1
    };

    // Object that holds the three possible login tab views
    $scope.FORGOT_VIEW = {
        FORGOT: 0,
        RESET: 1
    };

    // Object that holds the username and password values
    $scope.credentials = {
        email: '',
        password: undefined
    };

    // Object that holds new user parameters
    $scope.newUser = {
        firstName: undefined,
        lastName: undefined,
        email: '',
        password: '',
        passwordConfirmation: '',
        iuvareId: undefined,
        xangoId: undefined,
        sponsorIuvareId: undefined,
        sponsorXango: {},
        placementIuvareId: undefined,
        placementXango: {}
    };

    // Object that holds the recover password data
    $scope.forgot = {
        email: ''
    };

    // Object that holds the recover password data
    $scope.reset = {
        token: undefined,
        password: undefined,
        passwordConfirmation: undefined
    };

    // Variables privadas
    var originalCredentials = angular.copy($scope.credentials);
    var originalNewUser = angular.copy($scope.newUser);
    var originalForgot = angular.copy($scope.forgot);
    var originalReset = angular.copy($scope.reset);

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
        $scope.resetLoginForm();
        $scope.currentView = $scope.VIEW.LOGIN;
        $scope.currentLoginView = $scope.LOGIN_VIEW.SIGNIN;
    };

    // Method that toggles to signup view
    $scope.showSignUpView = function () {
        $scope.resetSignupForm();
        $scope.currentLoginView = $scope.LOGIN_VIEW.SIGNUP;
    };

    // Method that toggles to forgot view
    $scope.showForgotView = function () {
        $scope.resetForgotForm();
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

    // Method that resets the login form
    $scope.resetLoginForm = function(){
        $scope.credentials = angular.copy(originalCredentials);
        $scope.loginFormMessage = '';
        $scope.loginForm.$setPristine();
        $scope.loginForm.$setUntouched();
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

    // Method to get a xango user
    $scope.getXangoUser = function(xangoUser, formField) {

        formField.$pending = true;

        if(xangoUser.id){
            XangoUserService.getXangoUser(xangoUser.id)
                .success(function(data){
                    if(data.success){
                        xangoUser.dbId = data.result.id;
                        xangoUser.message = data.result.first_name + ' ' + data.result.last_name;
                        formField.$setValidity('userExists', true);
                    } else {
                        xangoUser.dbId = undefined;
                        xangoUser.message = 'No existe un usuario con ese id';
                        formField.$setValidity('userExists', false);
                    }
                })
                .error(function(error, status){
                    xangoUser.dbId = undefined;
                    xangoUser.message = 'Ocurrió un error al obtener el usuario con ese id';
                    formField.$setValidity('userExists', false);
                });
        } else {
            xangoUser.dbId = undefined;
            xangoUser.message = undefined;
            formField.$setValidity('userExists', true);
        }

    };

    // Method that resets the login form
    $scope.resetSignupForm = function(){
        $scope.newUser = angular.copy(originalNewUser);
        $scope.signupFormMessage = '';
        $scope.signupForm.$setPristine();
        $scope.signupForm.$setUntouched();
    };

    // Method to register a new user
    $scope.signUp = function () {
        if($scope.invitationToken){
            if($scope.signupForm.$valid && !$scope.signupForm.signupXangoSponsorId.$pending && !$scope.signupForm.signupXangoPlacementId.$pending){

                var user = {
                    first_name: $scope.newUser.firstName,
                    last_name: $scope.newUser.lastName,
                    email: $scope.newUser.email,
                    password: $scope.newUser.password,
                    password_confirmation: $scope.newUser.passwordConfirmation,
                    xango_id: $scope.newUser.xangoId,
                    iuvare_id: $scope.requireIuvareId ? $scope.newUser.iuvareId : null,
                    kit_bought: $scope.requireIuvareId,
                    sponsor_xango_id: $scope.newUser.sponsorXango.id,
                    sponsor_iuvare_id: $scope.newUser.sponsorIuvareId,
                    placement_xango_id: $scope.newUser.placementXango.id,
                    placement_iuvare_id: $scope.newUser.placementIuvareId,
                    upline_id: $scope.newUser.placementXango.dbId
                };

                AuthService.signUp(user, $scope.invitationToken)
                    .then(
                    function(signupFormMessage) {
                        $scope.signupFormMessage = signupFormMessage;
                    }
                );
            } else {
                $scope.showAlert('Para enviar la solicitud de registro todos los campos deben ser válidos.', 'warning');
                console.log('Para enviar la solicitud de registro todos los campos deben ser válidos.');
            }
        }else{
            $scope.signupFormMessage = 'Para poder registrarte es necesario que recibas una invitación previa.';
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

            $scope.startSpin('container-spinner');

            var forgot = {
                email: $scope.forgot.email
            };

            AuthService.recoverPassword(forgot)
                .then(
                function(forgotFormMessage) {
                    $scope.showAlert(forgotFormMessage, 'success', false);
                    $scope.stopSpin('container-spinner');
                    $scope.resetForgotForm();
                    $scope.showLoginView();
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

            $scope.startSpin('container-spinner');

            var reset = {
                reset_password_token: $scope.reset.token,
                password: $scope.reset.password,
                password_confirmation: $scope.reset.passwordConfirmation
            };

            AuthService.resetPassword(reset)
                .then(
                function(resetFormMessage) {
                    $scope.showAlert(resetFormMessage, 'success', false);
                    $scope.stopSpin('container-spinner');
                    $scope.resetResetForm();
                    $scope.showLoginView();
                }
            );
        }
    };

    $scope.initController();

}]);
