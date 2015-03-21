/*
 *   LoginController as loginCtrl
 *   Description: Controller for signup, login and logout views
 * */

'use strict';

iuvare.controller('LoginController', ["$scope", "$rootScope", "AuthService", function($scope, $rootScope, AuthService){

    $scope.VIEW = {
        SIGNIN: 0,
        SIGNUP: 1
    };

    // Object that holds the username and password values
    $scope.credentials = {
        iuvareId: undefined,
        password: undefined
    };

    // Object that holds new user parameters
    $scope.newUser = {
        name: undefined,
        mail: undefined,
        password: undefined,
        passwordConfirm: undefined,
        iuvareId: undefined,
        xangoId: undefined
    };


    // Method no init the controller default state
    $scope.initController = function(){
        $scope.currentView = $scope.VIEW.SIGNIN;
    };

    // Method to authenticate a user
    $scope.sigin = function () {
        AuthService.signIn($scope.credentials);
    };

    // Method to register a new user
    $scope.signup = function () {
        AuthService.signUp($scope.newUser);
    };

    // Method no log out a user session
    $scope.sigout = function () {

    };

    // Method that returns if the parameter view is the current view
    $scope.isCurrentView = function (view) {
        return (view == $scope.currentView);
    };


    $scope.initController();

}]);