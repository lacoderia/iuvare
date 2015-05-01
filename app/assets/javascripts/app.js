/*
 *   App
 *   Description: Configuration app module
 * */
'use strict';

var iuvare = angular.module('iuvare', ['ngResource', 'ui.router', 'mgcrea.ngStrap']);

iuvare.constant('DEFAULT_VALUES',{
    SECTIONS: [
        { order: 1, code: 'BUSINESS', title: 'Negocios', state: 'business.cycle',
            subsections: [
                { order:1, code: 'CYCLE', title: 'Ciclo', state: 'business.cycle' },
                { order:2, code: 'NETWORK', title: 'Mi red', state: 'business.network' },
                { order:3, code: 'LIST', title: 'Lista', state: 'business.list' }
            ]
        },
        { order: 2, code: 'SYSTEM', title:'Sistema', state: 'system.cycle',
            subsections: [
                { order:1, code: 'AUDIO', title: 'Audios', state: 'system.audio' },
                { order:2, code: 'SEMINAR', title: 'Seminarios', state: 'system.seminar' },
                { order:3, code: 'CONVENTION', title: 'Convenciones', state: 'system.convention' },
                { order:4, code: 'TRAINING', title: 'Capacitaciones', state: 'system.training' },
                { order:5, code: 'DOCUMENT', title: 'Documentos', state: 'system.document' }
            ]
        },
        { order: 3, code: 'PROFILE', title: 'Perfil', state: 'profile.cycle',
            subsections: [
                { order:1, code: 'CYCLE', title: 'Ciclo', state: 'business.cycle' },
                { order:2, code: 'NETWORK', title: 'Mi red', state: 'business.network' }
            ]
        }
    ],
    SECTIONS_CODES: {
        BUSINESS: 'BUSINESS',
        SYSTEM: 'SYSTEM',
        PROFILE: 'PROFILE',
        AUDIO: 'AUDIO',
        SEMINAR: 'SEMINAR',
        CONVENTION: 'CONVENTION',
        TRAINING: 'TRAINING',
        DOCUMENT: 'DOCUMENT'

    },
    SUBSECTIONS_CODES:{
        CYCLE: 'CYCLE',
        NETWORK: 'NETWORK',
        LIST: 'LIST',
        AUDIO: 'AUDIO',
    },
    CYCLE_STATUS:{
        0: 'Completado',
        1: 'Ciclando'
    },
    DOWNLINE_LENGTH_LIMIT: 4
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
            section: 'BUSINESS',
            subsection: undefined,
            authenticationRequired: true
        }).state('business.cycle',{
            url: "/ciclo",
            templateUrl: '/assets/business_partial.cycle.html',
            redirectState: 'business.cycle',
            defaultState: 'login',
            section: 'BUSINESS',
            subsection: 'CYCLE',
            authenticationRequired: true
        }).state('business.network',{
            url: "/mi-red",
            templateUrl: '/assets/business_partial.network.html',
            redirectState: 'business.network',
            defaultState: 'login',
            section: 'BUSINESS',
            subsection: 'NETWORK',
            authenticationRequired: true
        }).state('business.list',{
            url: "/lista",
            templateUrl: '/assets/business_partial.list.html',
            redirectState: 'business.list',
            defaultState: 'login',
            section: 'BUSINESS',
            subsection: 'LIST',
            authenticationRequired: true
        }).state('system',{
            url: "/sistema",
            templateUrl: '/assets/system_partial.html',
            redirectState: 'system.audio',
            defaultState: 'login',
            section: 'SYSTEM',
            subsection: undefined,
            authenticationRequired: true
        }).state('system.audio',{
            url: "/audios",
            templateUrl: '/assets/system_partial.audio.html',
            redirectState: 'system.cycle',
            defaultState: 'login',
            section: 'SYSTEM',
            subsection: 'AUDIO',
            authenticationRequired: true
        }).state('system.seminar',{
            url: "/seminarios",
            templateUrl: '/assets/system_partial.seminar.html',
            redirectState: 'system.seminar',
            defaultState: 'login',
            section: 'SYSTEM',
            subsection: 'SEMINAR',
            authenticationRequired: true
        }).state('system.convention',{
            url: "/convenciones",
            templateUrl: '/assets/system_partial.convention.html',
            redirectState: 'system.convention',
            defaultState: 'login',
            section: 'SYSTEM',
            subsection: 'CONVENTION',
            authenticationRequired: true
        }).state('system.training',{
            url: "/capacitaciones",
            templateUrl: '/assets/system_partial.training.html',
            redirectState: 'system.training',
            defaultState: 'login',
            section: 'SYSTEM',
            subsection: 'TRAINING',
            authenticationRequired: true
        }).state('system.document',{
            url: "/documentos",
            templateUrl: '/assets/system_partial.document.html',
            redirectState: 'system.document',
            defaultState: 'login',
            section: 'SYSTEM',
            subsection: 'DOCUMENT',
            authenticationRequired: true
        });

}]);

iuvare.run(['$rootScope', '$state', '$location', 'AuthService', 'SessionService', function($rootScope, $state, $location,  AuthService, SessionService){

    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){

        if(toState.authenticationRequired){
            if(!AuthService.isAuthenticated()){

                AuthService.getCurrentSession().then(
                    function(data){
                        if(data.data.success){
                            var result = data.data.result;
                            SessionService.createSession(result.id, result.first_name, result.last_name, result.email, result.xango_id, result.xango_rank, result.iuvare_id, result.sponsor_xango_id, result.sponsor_iuvare_id, result.placemente_xango_id, result.placemente_iuvare_id, result.active, result.downline_position, result.payment_expiration, result.picture, result.upline_id);
                        }else{
                            event.preventDefault();
                            $state.transitionTo(toState.defaultState);
                        }
                    },
                    function(response){
                        console.log(response);

                        event.preventDefault();
                        $state.transitionTo(toState.defaultState);
                    }
                );
            }
        }

    });

}]);

iuvare.config(['$httpProvider', function($httpProvider){
    $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
}]);

/*
    Directivas menores
 */

iuvare.directive('pwCheck', function() {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=pwCheck"
        },
        link: function(scope, element, attributes, ngModel) {

            ngModel.$validators.pwCheck = function(modelValue) {
                return modelValue == scope.otherModelValue;
            };

            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
    };
});
