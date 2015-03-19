/*
 *   App
 *   Description: Configuration app module
 * */
'use strict';

var iuvare = angular.module('iuvare', ['ngResource', 'ngRoute']);

iuvare.config(function ($routeProvider, $locationProvider) {

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

    $routeProvider
        .when('/', {
            templateUrl: '/assets/index.html'
        })
        .when('/login',{
            templateUrl: '/assets/login.html'
        })
        .otherwise({ redirectTo: '/' });

});