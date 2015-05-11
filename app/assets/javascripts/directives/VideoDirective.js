'use strict';

iuvareDirectives.directive('lcVideo', ['$rootScope', '$timeout', function($rootScope, $timeout){

    return{
        restrict: 'A',
        replace: false,
        scope: {
            onended: '='
        },
        link: function(scope, element, attrs){

            scope.initDirective = function(){

                var video = angular.element(element)[0];
                video.onended = function () {
                    scope.onended();
                };
            };

            scope.initDirective();


        }
    }

}]);
