/*
 *   App
 *   Description: Configuration app module
 * */
'use strict';

var iuvare = angular.module('iuvare', ['ngResource', 'iuvareDirectives', 'ui.router', 'mgcrea.ngStrap', 'ngQuickDate', 'angularUtils.directives.dirPagination', 'iso.directives', 'uiGmapgoogle-maps', 'chart.js', "ngSanitize", 'com.2fdevs.videogular', 'com.2fdevs.videogular.plugins.controls', 'com.2fdevs.videogular.plugins.overlayplay', 'com.2fdevs.videogular.plugins.buffering']);

iuvare.constant('DEFAULT_VALUES',{
    SECTIONS: [
        { order: 1, code: 'BUSINESS', title: 'Negocio', state: 'business.cycle',
            subsections: [
                { order:1, code: 'CYCLE', title: 'Ciclo', state: 'business.cycle' },
                { order:2, code: 'LIST', title: 'Lista', state: 'business.list' },
                { order:3, code: 'PLAN', title: 'Plan', state: 'business.plan_list' },
                { order:4, code: 'HEADQUARTERS', title: 'Sedes', state: 'business.headquarters' }
            ]
        },
        { order: 2, code: 'SYSTEM', title:'Sistema', state: 'system.audio',
            subsections: [
                { order:1, code: 'AUDIO', title: 'Audios', state: 'system.audio' },
                { order:2, code: 'SEMINAR', title: 'Seminarios', state: 'system.seminar' },
                { order:3, code: 'CONVENTION', title: 'Convenciones', state: 'system.convention' },
                { order:4, code: 'TRAINING', title: 'Capacitaciones', state: 'system.training' },
                { order:5, code: 'DOCUMENT', title: 'Documentos', state: 'system.document' }
            ]
        },
        { order: 3, code: 'PROFILE', title: 'Perfil', state: 'profile.why',
            subsections: [
                { order:1, code: 'WHY', title: 'Mis metas', state: 'profile.why' },
                { order:2, code: 'COLLAGE', title: 'Collage', state: 'profile.collage' },
                { order:3, code: 'TEST', title: 'Test de personalidad', state: 'profile.test' },
                { order:4, code: 'PROFILE', title: 'Mis datos', state: 'profile.profile' }
            ]
        }
    ],
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
    },
    TEST_CODES:{
        COLOR: 'color',
        MODULE_1: 'module_1',
        MODULE_2: 'module_2',
        MODULE_3: 'module_3',
        BASICS: 'basics',
        PLAN: 'plan'
    },
    CONTACT_STATUS: {
        TO_CLOSE: { order:1, code:'to_close', title: 'Por cerrar', class: 'to-close' },
        CONTACTED: { order:2, code:'contacted', title: 'Contactado', class: 'contacted' },
        TO_INVITE: { order:3, code:'to_invite', title: 'Por invitar', class: 'to-invite' },
        REGISTERED: { order:4, code:'registered', title: 'Registrado', class: 'registered' },
        RULED_OUT: { order:5, code:'ruled_out', title: 'Descartado', class: 'ruled-out' }
    },
    ASSETS:{
        PATH: '/assets/',
        TYPES: {
            AUDIO: 'audio',
            DOCUMENT: 'document',
            PLAN: 'plan',
            SEMINAR: 'seminar',
            CONVENTION: 'convention',
            TRAINING: 'training'
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

    var authenticated = ['$q', 'AuthService', 'SessionService', function ($q, AuthService, SessionService) {
        var deferred = $q.defer();

        if(!AuthService.isAuthenticated()){
            AuthService.getCurrentSession().then(
                function(data){
                    if(data.data.success){
                        var result = data.data.result;
                        SessionService.createSession(result.id, result.first_name, result.last_name, result.email, result.xango_id, result.xango_rank, result.iuvare_id, result.sponsor_xango_id, result.sponsor_iuvare_id, result.placemente_xango_id, result.placemente_iuvare_id, result.active, result.downline_position, result.payment_expiration, result.picture, result.upline_id, result.test_scores, result.downline_count);
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
            defaultState: 'login',
            authenticationRequired: false
        }).state('register',{
            url: "/register",
            templateUrl: '/assets/login.html',
            defaultState: 'login',
            authenticationRequired: false
        }).state('plan',{
            url: "/plan",
            templateUrl: '/assets/plan.html',
            defaultState: 'login',
            authenticationRequired: false
        }).state('business',{
            url: "/negocio",
            templateUrl: '/assets/business_partial.html',
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
            defaultState: 'login',
            section: 'BUSINESS',
            subsection: 'CYCLE',
            authenticationRequired: true
        }).state('business.list',{
            url: "/lista",
            templateUrl: '/assets/business_partial.list.html',
            defaultState: 'login',
            section: 'BUSINESS',
            subsection: 'LIST',
            authenticationRequired: true
        }).state('business.headquarters',{
            url: "/sedes",
            templateUrl: '/assets/business_partial.headquarters.html',
            defaultState: 'login',
            section: 'BUSINESS',
            subsection: 'HEADQUARTERS',
            authenticationRequired: true
        }).state('business.plan_list',{
            url: "/lista-plan",
            templateUrl: '/assets/business_partial.plan_list.html',
            defaultState: 'login',
            section: 'BUSINESS',
            subsection: 'PLAN',
            authenticationRequired: true
        }).state('profile',{
            url: "/perfil",
            templateUrl: '/assets/profile_partial.html',
            defaultState: 'login',
            section: 'PROFILE',
            subsection: undefined,
            authenticationRequired: true,
            resolve: {
                authenticated: authenticated
            }
        }).state('profile.why',{
            url: "/mis-metas",
            templateUrl: '/assets/profile_partial.why.html',
            defaultState: 'login',
            section: 'PROFILE',
            subsection: 'WHY',
            authenticationRequired: true
        }).state('profile.collage',{
            url: "/collage",
            templateUrl: '/assets/profile_partial.collage.html',
            defaultState: 'login',
            section: 'PROFILE',
            subsection: 'COLLAGE',
            authenticationRequired: true
        }).state('profile.test',{
            url: "/test",
            templateUrl: '/assets/profile_partial.test.html',
            defaultState: 'login',
            section: 'PROFILE',
            subsection: 'TEST',
            authenticationRequired: true
        }).state('profile.profile',{
            url: "/mis-datos",
            templateUrl: '/assets/profile_partial.profile.html',
            defaultState: 'login',
            section: 'PROFILE',
            subsection: 'PROFILE',
            authenticationRequired: true
        }).state('system',{
            url: "/sistema",
            templateUrl: '/assets/system_partial.html',
            defaultState: 'login',
            section: 'SYSTEM',
            subsection: undefined,
            authenticationRequired: true
        }).state('system.audio',{
            url: "/audios",
            templateUrl: '/assets/system_partial.audio.html',
            defaultState: 'login',
            section: 'SYSTEM',
            subsection: 'AUDIO',
            authenticationRequired: true
        }).state('system.seminar',{
            url: "/seminarios",
            templateUrl: '/assets/system_partial.seminar.html',
            defaultState: 'login',
            section: 'SYSTEM',
            subsection: 'SEMINAR',
            authenticationRequired: true
        }).state('system.convention',{
            url: "/convenciones",
            templateUrl: '/assets/system_partial.convention.html',
            defaultState: 'login',
            section: 'SYSTEM',
            subsection: 'CONVENTION',
            authenticationRequired: true
        }).state('system.training',{
            url: "/capacitaciones",
            templateUrl: '/assets/system_partial.training.html',
            defaultState: 'login',
            section: 'SYSTEM',
            subsection: 'TRAINING',
            authenticationRequired: true
        }).state('system.document',{
            url: "/documentos",
            templateUrl: '/assets/system_partial.document.html',
            defaultState: 'login',
            section: 'SYSTEM',
            subsection: 'DOCUMENT',
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

iuvare.config(['$logProvider',function($logProvider){
    $logProvider.debugEnabled(true);
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

iuvare.directive('imagesLoaded', function($timeout) {
    return {
        restrict: 'A',
        link: function($scope, $elem, $attr) {

            $timeout(function() {
                $elem.isotope();

                $elem.isotope('once', 'layoutComplete', function(isoInstance, laidOutItems) {
                    $elem.imagesLoaded(function() {
                        $elem.isotope('layout');
                    });
                });
            }, 0);
        }
    };
});

/*
 *   Filtros
 */

iuvare.filter('formatDate', function(){
    return function(date){
        if(date){
            date = new moment(date);
            return date.format('LL');
        }
    }
});