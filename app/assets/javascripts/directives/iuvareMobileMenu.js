'use strict';

iuvareDirectives.directive('iuvareMobileMenu', ['$rootScope', '$window', '$document', '$timeout', function($rootScope, $window, $document, $timeout){

    return{
        restrict: 'A',
        replace: false,
        scope: {
        },
        link: function(scope, element, attrs) {

            scope._timeout  = null;
            scope.initialBottom = 0;

        }
    }

}]);