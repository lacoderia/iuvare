/*
 *   App
 *   Description: Configuration app module
 * */
'use strict';

var iuvare = angular.module('iuvare', ['ngResource', 'ui.router']);

iuvare.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function ($stateProvider, $locationProvider, $urlRouterProvider) {

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

    $urlRouterProvider.otherwise(function($injector){
        $injector.invoke(['$state', function($state) {
            $state.go('home');
        }])
    });

    $stateProvider

        .state('home',{
            url: "/",
            templateUrl: '/assets/login.html',
            redirectState: 'home',
            defaultState: 'home',
            authenticationRequired: false
        })
        .state('login',{
            url: "/login",
            templateUrl: '/assets/login.html',
            redirectState: 'login',
            defaultState: 'login',
            authenticationRequired: false
        })
        .state('business',{
            url: "/negocio",
            templateUrl: '/assets/cycle.html',
            redirectState: 'cycle',
            defaultState: 'home',
            authenticationRequired: true
        })
        .state('cycle',{
            url: "/negocio/ciclo",
            templateUrl: '/assets/cycle.html',
            redirectState: 'cycle',
            defaultState: 'home',
            authenticationRequired: true
        })
        .state('why',{
            url: "/negocio/porque",
            templateUrl: '/assets/why.html',
            redirectState: 'why',
            defaultState: 'home',
            authenticationRequired: true
        })
        .state('collage',{
            url: "/negocio/collage",
            templateUrl: '/assets/collage.html',
            redirectState: 'collage',
            defaultState: 'home',
            authenticationRequired: true
        })
        .state('personality',{
            url: "/negocio/personalidad",
            templateUrl: '/assets/personality.html',
            redirectState: 'personality',
            defaultState: 'home',
            authenticationRequired: true
        });


}]);

iuvare.run(['$rootScope', '$state', 'AuthService', function($rootScope, $state, AuthService){
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
        if(toState.authenticationRequired){
            if(!AuthService.isAuthenticated()){

                // TODO Intentar autenticar, si no, regresar al defaultState
                console.log('INTENTA AUTENTICAR')

            }else{
                if(toState.name != toState.redirectState){
                    $state.go(toState.redirectState)
                }
            }
        }else{
            if(toState.name != toState.redirectState){
                $state.go(toState.redirectState)
            }
        }
    });
}]);

iuvare.config(['$httpProvider', function($httpProvider){
    $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
}]);
