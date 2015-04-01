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

    // Method to init the controller's default state
    $scope.initController = function(){
        $scope.invitationToken = $location.search().token;
        ($scope.invitationToken)? $scope.currentView = $scope.VIEW.SIGNUP : $scope.currentView = $scope.VIEW.SIGNIN;
    };

    // Method to authenticate a user
    $scope.sigin = function () {
        AuthService.signIn($scope.credentials);
    };

    // Method to register a new user
    $scope.signup = function () {
        if($scope.invitationToken){
            AuthService.signUp($scope.newUser, $scope.invitationToken);
        }else{
            console.log('NO TIENES TOKEN')
        }
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