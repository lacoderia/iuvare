/*
 *   App
 *   Description: Configuration app module
 * */
'use strict';

var iuvare = angular.module('iuvare',
    [   'ngResource',
        'iuvareDirectives',
        'ui.router',
        'ngAnimate',
        'mgcrea.ngStrap',
        'ngQuickDate',
        'angularUtils.directives.dirPagination',
        'iso.directives',
        'uiGmapgoogle-maps',
        'chart.js',
        'ngSanitize',
        'com.2fdevs.videogular',
        'com.2fdevs.videogular.plugins.controls',
        'com.2fdevs.videogular.plugins.overlayplay',
        'com.2fdevs.videogular.plugins.buffering',
        'angularSpinner',
        'ui.checkbox',
        'angular-svg-round-progress'
    ]);

iuvare.constant('DEFAULT_VALUES',{
    SECTIONS: [
        { order: 1, code: 'BUSINESS', title: 'Negocio', state: 'business.cycle',
            subsections: [
                { order:1, code: 'CYCLE', title: 'Ciclo', state: 'business.cycle', icon: 'icon-sitemap' },
                { order:2, code: 'LIST', title: 'Lista', state: 'business.list', icon: 'icon-list' },
                { order:3, code: 'PROGRESS', title: 'Avance', state: 'business.progress', icon: 'icon-plan' },
                { order:4, code: 'PLAN', title: 'Plan', state: 'business.plan_list', icon: 'icon-plan' },
                { order:5, code: 'HEADQUARTERS', title: 'Sedes', state: 'business.headquarters', icon: 'icon-sedes' }
            ]
        },
        { order: 2, code: 'SYSTEM', title:'Sistema', state: 'system.audio',
            subsections: [
                { order:1, code: 'AUDIO', title: 'Audios', state: 'system.audio', icon: 'icon-headphones' },
                { order:2, code: 'SEMINAR', title: 'Seminarios', state: 'system.seminar', icon: 'icon-conferencias' },
                { order:3, code: 'CONVENTION', title: 'Convenciones', state: 'system.convention', icon: 'icon-convenciones' },
                { order:4, code: 'TRAINING', title: 'Capacitaciones', state: 'system.training', icon: 'icon-mortar-board' },
                { order:5, code: 'DOCUMENT', title: 'Documentos', state: 'system.document', icon: 'icon-file' }
            ]
        },
        { order: 3, code: 'PROFILE', title: 'Perfil', state: 'profile.why',
            subsections: [
                { order:1, code: 'WHY', title: 'Mis metas', state: 'profile.why', icon: 'icon-flag-checkered' },
                { order:2, code: 'COLLAGE', title: 'Collage', state: 'profile.collage', icon: 'icon-pictures' },
                { order:3, code: 'TEST', title: 'Test de personalidad', state: 'profile.test', icon: 'icon-chart' },
                { order:4, code: 'PROFILE', title: 'Mis datos', state: 'profile.profile', icon: 'icon-profile' }
            ]
        },
        { order: 3, code: 'FAQ', title: 'FAQ', state: 'FAQ',
            subsections: []
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
        RULED_OUT: { order:0, code:'ruled_out', title: 'Descartado', class: 'ruled-out'},
        TO_INVITE: { order:1, code:'to_invite', title: 'Prospecto', class: 'to-invite'},
        CONTACTED: { order:2, code:'contacted', title: 'Invitado', class: 'contacted'},
        TO_CLOSE: { order:3, code:'to_close', title: 'Plan visto', class: 'to-close'},
        TO_REGISTER: { order:4, code:'to_register', title: 'Por inscribir', class: 'to-register'},
        REGISTERED: { order:5, code:'registered', title: 'Inscrito', class: 'registered'}
    },
    CONTACT_STATUS_COLORS : ['#FF0000', '#E0E0E0', '#E0F3DB', '#A7F392', '#6BF347', '#7CB66D'],
    ASSETS:{
        PATH: '/assets/',
        TYPES: {
            AUDIO: 'audio',
            DOCUMENT: 'document',
            PLAN: 'plan',
            SEMINAR: 'seminar',
            CONVENTION: 'convention',
            TRAINING: 'training',
            FAQ: 'FAQ'
        }
    },
    COLOR_DESC: {
        YELLOW: {
            desc: 'Amarillo',
            class: 'yellow',
            recommended: [{title: 'Nuevos profesionales de network marketing', material_location: 'Factor x'}],
            traits: ['Se afectan cuando existe presión',
                'Impaciente e impulsivo',
                'Intenta dominar al tener contacto y es directo',
                'Usa preguntas desafiantes',
                'Interrumpe, puede leer cuando tu hablas',
                'Contacto visual directo y firme, puede ser desafiante y amenazador',
                'Impaciente',
                'Apunta con el dedo para enfatizar algo o tomar el control',
                'Puede aparentar negligencia o rudeza',
                'Estrecha la mano con fuerza y es asertivo',
                'No se aparta de los conflictos, se siente cómodo con los mismos'
            ],
            other_traits: [
                {title: 'Miedo básico', desc: 'Fallar'},
                {title: 'Motivador', desc: 'Poder y fuerza'},
                {title: 'Valor para la organización', desc:'Persona de resultados'},
                {title: 'Fuerza de ventas', desc:'Cierre de negocios'}
            ]
        },
        BLUE: {
            desc: 'Azul',
            class: 'blue',
            recommended: [{title: 'Sé el dueño de tu vida', material_location: 'Factor x'}],
            traits: ['Metódico y organizado',
                'Aoariencia de sofisticación',
                'Preocupado por la seguridad',
                'Reacio a cambiar su STATUS-QUO',
                'Tendencia a preguntar con el fin de esclarecer',
                'Ritmo lento, reacciones demoradas cuando expone un problema',
                'Normalmente buen oyente',
                'Aborda los problemas cautelosamente',
                'Apretón de manos amigable',
                'Prefiere gerenciar que dirigir',
                'Oficina segura y confortable',
                'Escritorio organizado con fotos de la familia',
                'Generalmente muy cortés',
                'Contacto visual sincero, caluroso, amigable',
                'Contacto cauteloso',
                'Posición defensiva y gesticula en una situación competitiva'
            ],
            other_traits: [
                {title: 'Miedo básico', desc: 'Cambios'},
                {title: 'Motivador', desc: 'Seguridad'},
                {title: 'Valor para la organización', desc:'Áreas administrativas y soporte'},
                {title: 'Fuerza de ventas', desc:'Servicio/atención y ayuda'}
            ]
        },
        RED: {
            desc: 'Rojo',
            class: 'red',
            recommended: [{title: 'Placer y Dolor', material_location: 'Factor x'}],
            traits: ['Entusiasta y amigable',
                'Frecuentemente desatento a los detalles',
                'Positivo y verbal',
                'Gusta de contar historias y anéctodas',
                'Puede parecer superficial e impulsivo',
                'Apretón de mano muy amigable',
                'Desorganizado',
                'Exhibe fotos trofeos',
                'Se viste casual, le gustan los colores',
                'Utiliza últimas tecnologías electrónicas',
                'Sociable y cortés',
                'Hospitalario',
                'Contacto visual amigable',
                'Sonríe con los ojos',
                'Mucho movimiento corporal',
                'Utiliza sus manos al hablar',
                'Pose un estilo abierto y relajado',
                'Toca a los demás como señal de amistad y sinceridad',
                'Cuando está interesado o preocupado posterga decisiones',
                'Prefiere persuadir o conversar en vez de confrontar agresivamente o hacer exigencias'
            ],
            other_traits: [
                {title: 'Miedo básico', desc: 'Rechazo'},
                {title: 'Motivador', desc: 'Reconocimiento de personas'},
                {title: 'Valor para la organización', desc:'Trabajo con/o para personas'},
                {title: 'Fuerza de ventas', desc:'Apertura de negocios'}
            ]
        },
        GREEN: {
            desc: 'Verde',
            class: 'green',
            recommended: [{title: 'Una magnifica opción ante la crisis', material_location: 'Factor x'}],
            traits: ['Se prepara con anticipación',
                'Organizado y puntual',
                'Sistemático y disciplinado sobre todo con el tiempo',
                'Tendencia a no compartir sus sentimientos',
                'Tiene un cuestionario preciso y detallado',
                'Apretón de manos suelto, breve a veces nervioso',
                'Usa pausas para pensar',
                'Muy orientado a los hechos y evidencias',
                'Difícil de convencer ',
                'Escritorio organizado e impersonal',
                'Puede reír nerviosamente',
                'Todo encaja en su sistema función',
                'Mut político y diplomático',
                'Forma de vestir cuidadosa y conservadora',
                'Evita contacto visual particularmente en una situación hostil',
                'Tiende a ser cauteloso y no expresa sentimientos a través de sus gestos',
                'Parece frío y poco expresivo'
            ],
            other_traits: [
                {title: 'Miedo básico', desc: 'Conflictos'},
                {title: 'Motivador', desc: 'Reglas y procedimientos'},
                {title: 'Valor para la organización', desc:'Áreas técnicas y de calidad'},
                {title: 'Fuerza de ventas', desc:'Contratos y aspectos técnicos'}
            ]
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

    var authenticated = ['$rootScope', '$state', '$q', 'AuthService', 'SessionService', function ($rootScope, $state, $q, AuthService, SessionService) {
        var deferred = $q.defer();

        if(!AuthService.isAuthenticated()){
            AuthService.getCurrentSession().then(
                function(data){
                    if(data.data.success){
                        var result = data.data.result;
                        SessionService.createSession(result.id, result.first_name, result.last_name, result.email, result.xango_id, result.xango_rank, result.iuvare_id, result.sponsor_xango_id, result.sponsor_iuvare_id, result.placemente_xango_id, result.placemente_iuvare_id, result.active, result.downline_position, result.payment_expiration, result.picture, result.upline_id, result.test_scores, result.downline_count, result.access_level);
                        $rootScope.$broadcast('getMonthlyEvent');
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

    var refreshSession = ['$rootScope', '$state', '$q', 'AuthService', 'SessionService', function ($rootScope, $state, $q, AuthService, SessionService) {
        var deferred = $q.defer();

        AuthService.getCurrentSession().then(
            function(data){
                if(data.data.success){
                    var result = data.data.result;
                    SessionService.createSession(result.id, result.first_name, result.last_name, result.email, result.xango_id, result.xango_rank, result.iuvare_id, result.sponsor_xango_id, result.sponsor_iuvare_id, result.placemente_xango_id, result.placemente_iuvare_id, result.active, result.downline_position, result.payment_expiration, result.picture, result.upline_id, result.test_scores, result.downline_count, result.access_level);
                    $rootScope.$broadcast('getMonthlyEvent');
                    deferred.resolve();
                }else{
                    deferred.reject('Not logged in');
                }
            },
            function(response){
                deferred.reject('Not logged in');
            }
        );

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
        }).state('payment',{
            url: "/pagos",
            templateUrl: '/assets/payment.html',
            defaultState: 'login',
            authenticationRequired: false,
            resolve: {
                authenticated: authenticated
            }
        }).state('payment-success',{
            url: "/pagos-exito",
            templateUrl: '/assets/payment_success.html',
            defaultState: 'login',
            authenticationRequired: false,
            resolve: {
                refreshSession: refreshSession
            }
        }).state('payment-error',{
            url: "/pagos-error",
            templateUrl: '/assets/payment_error.html',
            defaultState: 'login',
            authenticationRequired: false,
            resolve: {
                refreshSession: refreshSession
            }
        }).state('business',{
            url: "/negocio",
            templateUrl: '/assets/business_partial.html',
            defaultState: 'login',
            section: 'BUSINESS',
            subsection: undefined,
            authenticationRequired: true,
            resolve: {
                authenticated: authenticated
            },
            data: {
                checkPayment: true
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
        }).state('business.progress',{
            url: "/avance",
            templateUrl: '/assets/business_partial.progress.html',
            defaultState: 'login',
            section: 'BUSINESS',
            subsection: 'PROGRESS',
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
            },
            data: {
                checkPayment: true
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
            authenticationRequired: true,
            resolve: {
                authenticated: authenticated
            },
            data: {
                checkPayment: true
            }
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
        }).state('FAQ',{
            url: "/FAQ",
            templateUrl: '/assets/faq.html',
            defaultState: 'login',
            section: 'FAQ',
            subsection: undefined,
            authenticationRequired: true,
            resolve: {
                authenticated: authenticated
            },
            data: {
                checkPayment: true
            }
        });

}]);

iuvare.run(function ($rootScope, $state, $log, SessionService) {
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        if(toState.data && toState.data.checkPayment){
            if(SessionService.$get().getAccessLevel() && !SessionService.$get().getAccessLevel().valid_account){
                $state.go('payment');
            }
        }
    });

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

iuvare.filter('trustAsResourceUrl', function($sce) {
    return function(val) {
        return $sce.trustAsResourceUrl(val);
    };
});