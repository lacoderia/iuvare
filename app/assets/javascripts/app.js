/*
 *   App
 *   Description: Configuration app module
 * */
'use strict';

var iuvare = angular.module('iuvare', ['ngResource', 'ui.router', 'mgcrea.ngStrap']);

iuvare.constant('DEFAULT_VALUES',{
    BUSINESS_SUBSECTIONS_POSITION: {
        CYCLE: 0,
        NETWORK: 1,
        WHY: 2,
        COLLAGE: 3,
        PERSONALITY: 4,
        PREFERENCES: 5

    },
    BUSINESS_SUBSECTIONS: [
        { order:1, code: 'CYCLE', title: 'Ciclo', state: 'business.cycle' },
        { order:2, code: 'NETWORK', title: 'Mi red', state: 'business.network' },
        { order:3, code: 'WHY', title: 'Por qué', state: 'business.why' },
        { order:4, code: 'COLLAGE', title: 'Collage', state: 'business.collage' },
        { order:5, code: 'PERSONALITY', title: 'Personalidad', state: 'business.personality' },
        { order:6, code: 'PREFERENCES', title: 'Preferencias', state: 'business.preferences' }
    ],
    CYCLE_STATUS:{
        0: 'Completado',
        1: 'Ciclando'
    }
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
        }).state('register',{
            url: "/register",
            templateUrl: '/assets/login.html',
            redirectState: 'register',
            defaultState: 'login',
            authenticationRequired: false
        }).state('business',{
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
        }).state('business.network',{
            url: "/mi-red",
            templateUrl: '/assets/business_partial.network.html',
            redirectState: 'business.network',
            defaultState: 'login',
            authenticationRequired: true
        }).state('business.why',{
            url: "/why",
            templateUrl: '/assets/business_partial.why.html',
            redirectState: 'business.why',
            defaultState: 'login',
            authenticationRequired: true
        });

}]);

iuvare.run(['$rootScope', '$state', '$location', 'AuthService', 'SessionService', function($rootScope, $state, $location,  AuthService, SessionService){
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
        if(toState.authenticationRequired){
            event.preventDefault();

            if(!AuthService.isAuthenticated()){

                AuthService.getCurrentSession().then(
                    function(data){
                        if(data){
                            var result = data.data.result;
                            if(result.id){
                                SessionService.createSession(result.id, result.first_name, result.last_name, result.email, result.xango_id, result.iuvare_id, result.sponsor_xango_id, result.sponsor_iuvare_id, result.placemente_xango_id, result.placemente_iuvare_id);
                                $state.go(toState.redirectState);
                            }
                        }
                    },
                    function (response) {
                        $state.go(toState.redirectState);
                    }
                );

            }else{
                $state.go(toState.redirectState);

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