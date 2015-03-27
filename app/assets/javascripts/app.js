/*
 *   App
 *   Description: Configuration app module
 * */
'use strict';

var iuvare = angular.module('iuvare', ['ngResource', 'ui.router']);

iuvare.constant('DEFAULT_VALUES',{
    BUSINESS_SUBSECTIONS_POSITION: {
        CYCLE: 0,
        WHY: 1,
        COLLAGE: 2,
        PERSONALITY: 3,
        PREFERENCES: 4

    },
    BUSINESS_SUBSECTIONS: [
        { order:1, code: 'CYCLE', title: 'Ciclo', state: 'cycle' },
        { order:2, code: 'WHY', title: 'Por qué', state: 'why' },
        { order:3, code: 'COLLAGE', title: 'Collage', state: 'collage' },
        { order:4, code: 'PERSONALITY', title: 'Personalidad', state: 'personality' },
        { order:5, code: 'PREFERENCES', title: 'Preferencias', state: 'preferences' }
    ]
});

iuvare.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function ($stateProvider, $locationProvider, $urlRouterProvider) {

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

    $urlRouterProvider.otherwise(function($injector){
        $injector.invoke(['$state', function($state) {
            $state.go('login');
        }])
    });

    $stateProvider
        .state('login',{
            url: "/login",
            templateUrl: '/assets/login.html',
            redirectState: 'login',
            defaultState: 'login',
            authenticationRequired: false
        })
        .state('business',{
            url: "/negocio",
            templateUrl: '/assets/business_partial.html',
            redirectState: 'business.cycle',
            defaultState: 'login',
            authenticationRequired: true
        }).state('business.cycle',{
            url: "/ciclo",
            templateUrl: '/assets/business_partial.cycle.html',
            redirectState: 'business.cycle',
            defaultState: 'login',
            authenticationRequired: true
        }).state('business.why',{
            url: "/why",
            templateUrl: '/assets/business_partial.why.html',
            redirectState: 'business.why',
            defaultState: 'login',
            authenticationRequired: true
        });

    /*$stateProvider

        .state({

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
            templateUrl: '/assets/business_partial.html',
            redirectState: 'business',
            defaultState: 'home',
            authenticationRequired: true,
            children: [

            ]
        })
        /*.state('business.cycle',{
            url: "/negocio/ciclo",
            templateUrl: '/assets/business_partial.cycle.html',
            redirectState: 'business.cycle',
            defaultState: 'home',
            authenticationRequired: true
        });

    */
}]);

iuvare.run(['$rootScope', '$state', 'AuthService', function($rootScope, $state, AuthService){
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){

        if(toState.authenticationRequired){

            //event.preventDefault();

            if(!AuthService.isAuthenticated()){
                if(toState.name != toState.redirectState){
                    $state.go(toState.redirectState)
                }
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