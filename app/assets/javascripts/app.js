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
        'angular-svg-round-progress',
        'angularMoment'
    ]);

iuvare.constant('DEFAULT_VALUES',{
    SECTIONS: [
        { order: 1, code: 'BUSINESS', title: 'Negocio', state: 'business.cycle',
            subsections: [
                { order:1, code: 'CYCLE', title: 'Ciclo', state: 'business.cycle', icon: 'icon-sitemap' },
                { order:2, code: 'LIST', title: 'Lista', state: 'business.list', icon: 'icon-list' },
                { order:3, code: 'PROGRESS', title: 'Avance', state: 'business.progress', icon: 'icon-funnel' },
                { order:4, code: 'PLAN', title: 'Plan', state: 'business.plan_list', icon: 'icon-plan' },
                { order:5, code: 'HEADQUARTERS', title: 'Sedes', state: 'business.headquarters', icon: 'icon-sedes' }
            ]
        },
        { order: 2, code: 'SYSTEM', title:'Sistema', state: 'system.audio',
            subsections: [
                { order:1, code: 'AUDIO', title: 'Audios', state: 'system.audio', icon: 'icon-headphones' },
                { order:2, code: 'BOOK', title: 'Libros', state: 'system.book', icon: 'icon-books' },
                { order:3, code: 'SEMINAR', title: 'Seminarios', state: 'system.seminar', icon: 'icon-conferencias' },
                { order:4, code: 'CONVENTION', title: 'Convenciones', state: 'system.convention', icon: 'icon-convenciones' },
                { order:5, code: 'TRAINING', title: 'Talleres y Videos', state: 'system.training', icon: 'icon-mortar-board' },
                { order:6, code: 'DOCUMENT', title: 'Documentos', state: 'system.document', icon: 'icon-file' }

            ]
        },
        { order: 3, code: 'PROFILE', title: 'Perfil', state: 'profile.why',
            subsections: [
                { order:1, code: 'WHY', title: 'Metas', state: 'profile.why', icon: 'icon-flag-checkered' },
                { order:2, code: 'COLLAGE', title: 'Collage', state: 'profile.collage', icon: 'icon-pictures' },
                { order:3, code: 'TEST', title: 'Test de personalidad', state: 'profile.test', icon: 'icon-chart' },
                { order:4, code: 'PROFILE', title: 'Datos personales', state: 'profile.profile', icon: 'icon-profile' }
            ]
        },
        { order: 4, code: 'FAQ', title: 'Ayuda', state: 'FAQ',
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
        RULED_OUT: { order:0, code:'ruled_out', title: 'En seguimiento', class: 'ruled-out', progress_value: 0},
        TO_INVITE: { order:1, code:'to_invite', title: 'Prospecto', class: 'to-invite', progress_value: 25},
        CONTACTED: { order:2, code:'contacted', title: 'Invitado', class: 'contacted', progress_value: 25},
        TO_CLOSE: { order:3, code:'to_close', title: 'Plan visto', class: 'to-close', progress_value: 25},
        TO_REGISTER: { order:4, code:'to_register', title: 'Por inscribir', class: 'to-register', progress_value: 25},
        REGISTERED: { order:5, code:'registered', title: 'Inscrito', class: 'registered', progress_value: 25}
    },
    CONTACT_STATUS_COLORS : ['#FF0000', '#E0E0E0', '#E0F3DB', '#B1F3A2', '#8EF375', '#07F33A'],
    ASSETS:{
        PATH: '/assets/',
        TYPES: {
            AUDIO: 'audio',
            DOCUMENT: 'document',
            PLAN: 'plan',
            SEMINAR: 'seminar',
            CONVENTION: 'convention',
            TRAINING: 'training',
            BOOK: 'book',
            FAQ: 'FAQ'
        },
        HISTORIC_TYPES: {
            AUDIO: 'audio',
            BOOK: 'book'
        }
    },
    COLOR_DESC: {
        YELLOW: {
            desc: 'Amarillo',
            class: 'yellow',
            recommended: [{title: 'Entre el arroyo y la piedra', material_location: 'La cornada del león'}],
            traits: ['No se afectan cuando existe presión',
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
            recommended: [{title: 'Enfrenta tus miedos', material_location: 'Creando restricción'}],
            traits: ['Metódico y organizado',
                'Apariencia de sofisticación',
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
            recommended: [{title: 'Tu manera de ver las cosas hace que las cosas cambien', material_location: 'Lo grande que puedes llegar a ser'}],
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
                'Posee un estilo abierto y relajado',
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
            recommended: [{title: 'Libre al fin!', material_location: 'Líderes del Network Marketing'}],
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
                'Muy político y diplomático',
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

        AuthService.getCurrentSession().then(
            function(data){
                if(data.data.success){

                    if(!AuthService.isAuthenticated()) {
                        var result = data.data.result;
                        SessionService.createSession(result.id, result.first_name, result.last_name, result.email, result.xango_id, result.xango_rank, result.iuvare_id, result.sponsor_xango_id, result.sponsor_iuvare_id, result.placemente_xango_id, result.placemente_iuvare_id, result.active, result.downline_position, result.payment_expiration, result.picture, result.upline_id, result.test_scores, result.downline_count, result.access_level);
                        $rootScope.$broadcast('getMonthlyEvent');
                    }

                    deferred.resolve();
                }else{
                    deferred.reject('Not logged in');
                }
            },
            function(response){
                if(response.status && response.status == 401) {
                    $rootScope.showUnauthorizedError = true;
                }
                deferred.reject('Not logged in');
            }
        );

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
                if(response.status && response.status == 401) {
                    $rootScope.showUnauthorizedError = true;
                }
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
        }).state('test',{
            url: "/test",
            templateUrl: '/assets/test.html',
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
        }).state('payment_membership',{
            url: "/pago_membresia",
            templateUrl: '/assets/payment_membership.html',
            defaultState: 'login',
            authenticationRequired: false
        }).state('payment_seminars',{
            url: "/pago_seminarios",
            templateUrl: '/assets/payment_seminars.html',
            defaultState: 'login',
            authenticationRequired: false
        }).state('payment_diplomado',{
            url: "/pago_diplomado",
            templateUrl: '/assets/payment_diplomado.html',
            defaultState: 'login',
            authenticationRequired: false
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
        }).state('system.book',{
            url: "/libros",
            templateUrl: '/assets/system_partial.book.html',
            defaultState: 'login',
            section: 'SYSTEM',
            subsection: 'BOOK',
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

        if ($rootScope.alert) {
            $rootScope.alert.hide();
        }

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

iuvare.directive('formAutofillFix', function() {
    return function(scope, elem, attrs) {
        // Fixes Chrome bug: https://groups.google.com/forum/#!topic/angular/6NlucSskQjY
        elem.prop('method', 'POST');

        // Fix autofill issues where Angular doesn't know about autofilled inputs
        if(attrs.ngSubmit) {
            setTimeout(function() {
                elem.unbind('submit').submit(function(e) {
                    e.preventDefault();
                    elem.find('input, textarea').trigger('input').trigger('change').trigger('keydown');
                    scope.$apply(attrs.ngSubmit);
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

iuvare.filter('millSecondsToTimeString', function() {
    return function(s) {
        function addZ(n) {
            return (n<10? '0':'') + n;
        }

        var ms = s % 1000;
        s = (s - ms) / 1000;
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;
        var hrs = (s - mins) / 60;

        return (hrs ? addZ(hrs) + ':' : '' ) + addZ(mins) + ':' + addZ(secs);
    }
});
