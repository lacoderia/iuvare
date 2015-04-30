/*
 *   App
 *   Description: Configuration app module
 * */
'use strict';

var iuvare = angular.module('iuvare', ['ngResource', 'iuvareDirectives', 'ui.router', 'mgcrea.ngStrap']);

iuvare.constant('DEFAULT_VALUES',{
    SECTIONS: [
        { order: 1, code: 'BUSINESS', title: 'Negocios', state: 'business.cycle',
            subsections: [
                { order:1, code: 'CYCLE', title: 'Ciclo', state: 'business.cycle' }
            ]
        },
        { order: 2, code: 'SYSTEM', title:'Sistema', state: 'system.cycle',
            subsections: [
                { order:1, code: 'CYCLE', title: 'Ciclo', state: 'business.cycle' },
                { order:2, code: 'NETWORK', title: 'Mi red', state: 'business.network' }
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
        PROFILE: 'PROFILE'
    },
    SUBSECTIONS_CODES:{
        CYCLE: 'CYCLE'
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

    var authenticated = ['$q', 'AuthService', 'SessionService', function ($q, AuthService, SessionService) {
        var deferred = $q.defer();

        if(!AuthService.isAuthenticated()){
            AuthService.getCurrentSession().then(
                function(data){
                    if(data.data.success){
                        var result = data.data.result;
                        SessionService.createSession(result.id, result.first_name, result.last_name, result.email, result.xango_id, result.xango_rank, result.iuvare_id, result.sponsor_xango_id, result.sponsor_iuvare_id, result.placemente_xango_id, result.placemente_iuvare_id, result.active, result.downline_position, result.payment_expiration, result.picture, result.upline_id);
                        deferred.resolve();
                    }else{
                        deferred.reject('Not logged in');
                    }
                },
                function(response){
                    deferred.reject('Not logged in');
                }
            );
        } else {
            deferred.resolve();
        }

        return deferred.promise;
    }];

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
            authenticationRequired: true,
            resolve: {
                authenticated: authenticated
            }
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
        });

}]);

iuvare.run(function ($rootScope, $state, $log) {
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams) {
        // Redirect user to our login page
        $state.go(toState.defaultState);
    });
});

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
