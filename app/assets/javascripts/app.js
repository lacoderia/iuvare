/*
 *   App
 *   Description: Configuration app module
 * */
'use strict';

var iuvare = angular.module('iuvare', ['ngResource', 'ui.router', 'mgcrea.ngStrap', 'ngQuickDate']);

iuvare.constant('DEFAULT_VALUES',{
    SECTIONS: [
        { order: 1, code: 'BUSINESS', title: 'Negocios', state: 'business.cycle',
            subsections: [
                { order:1, code: 'CYCLE', title: 'Ciclo', state: 'business.cycle' },
                { order:2, code: 'NETWORK', title: 'Mi red', state: 'business.network' }
            ]
        },
        { order: 2, code: 'SYSTEM', title:'Sistema', state: 'system.cycle',
            subsections: [
                { order:1, code: 'CYCLE', title: 'Ciclo', state: 'business.cycle' },
                { order:2, code: 'NETWORK', title: 'Mi red', state: 'business.network' }
            ]
        },
        { order: 3, code: 'PROFILE', title: 'Perfil', state: 'profile.profile',
            subsections: [
                { order:1, code: 'PROFILE', title: 'Mi perfil', state: 'profile.profile' },
                { order:2, code: 'WHY', title: 'Mis metas', state: 'profile.why' }
            ]
        }
    ],
    SECTIONS_CODES: {
        BUSINESS: 'BUSINESS',
        SYSTEM: 'SYSTEM',
        PROFILE: 'PROFILE'
    },
    SUBSECTIONS_CODES:{
        CYCLE: 'CYCLE',
        NETWORK: 'NETWORK',
        PROFILE: 'PROFILE',
        WHY: 'WHY'
    },
    CYCLE_STATUS:{
        0: 'Completado',
        1: 'Ciclando'
    },
    DOWNLINE_LENGTH_LIMIT: 4,
    GOAL_TYPES: [
        {
            code: 'be',
            name:'¿Qué quiero ser?'
        },
        {
            code: 'do',
            name:'¿Qué quiero hacer?'
        },
        {
            code: 'have',
            name:'¿Qué quiero tener?'
        },
        {
            code: 'share',
            name:'¿Qué quiero compartir?'
        },
        {
            code: 'travel',
            name:'¿A dónde quiero viajar?'
        },
        {
            code: 'worry_not',
            name:'¿De qué no me quiero preocupar?'
        }
    ],
    GOAL_MODES: {
        NEW: {
            action: 'new-goal',
            button: 'Guardar',
            description: 'Agregar una nueva meta'
        },
        EDIT: {
            action: 'edit-goal',
            button: 'Actualizar',
            description: 'Editar mi meta'
        }
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
        }).state('profile',{
            url: "/perfil",
            templateUrl: '/assets/profile_partial.html',
            redirectState: 'profile.profile',
            defaultState: 'login',
            section: 'PROFILE',
            subsection: undefined,
            authenticationRequired: true
        }).state('profile.profile',{
            url: "/mi-perfil",
            templateUrl: '/assets/profile_partial.profile.html',
            redirectState: 'profile.profile',
            defaultState: 'login',
            section: 'PROFILE',
            subsection: 'PROFILE',
            authenticationRequired: true
        }).state('profile.why',{
            url: "/mis-metas",
            templateUrl: '/assets/profile_partial.why.html',
            redirectState: 'profile.why',
            defaultState: 'login',
            section: 'PROFILE',
            subsection: 'WHY',
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

/*
*   Filtros
*/

iuvare.filter('formatDate', function(){
    return function(date){
        if(date){
            return date.format('LL');
        }
    }
})
