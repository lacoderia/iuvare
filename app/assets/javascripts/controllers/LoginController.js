/*
 *   LoginController as loginCtrl
 *   Description: Controller for signup, login and logout views
 * */

'use strict';

iuvare.controller('LoginController', ["$scope", "$rootScope", "$location", "AuthService", "InvitationService", function($scope, $rootScope, $location, AuthService, InvitationService){

    $scope.VIEW = {
        SIGNIN: 0,
        SIGNUP: 1,
        REQUEST: 2
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

    var originalRequest = angular.copy($scope.request);

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

    // Method that sets the selected premier on the dropdown
    $scope.setPremier = function(index){
        if ($scope.request) {
            $scope.request.premier = $scope.premiers[index];
        }
    };

    // Method to send user request
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
                    $scope.request = angular.copy(originalRequest);
                    $scope.requestForm.$setPristine();
                    $scope.requestForm.$setUntouched();
                }
            );
        }
    };

    // Method that returns if the parameter view is the current view
    $scope.isCurrentView = function (view) {
        return (view == $scope.currentView);
    };

    $scope.initController();

}]);