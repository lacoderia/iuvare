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

            var init = function () {
                if($window.innerWidth <= 768 && element[0].style.display != "none"){
                    angular.element(element[0].parentNode).addClass('mobile');

                    angular.element($window).bind('scroll', function(){

                        if(scope._timeout){ //if there is already a timeout in process cancel it
                            $timeout.cancel(scope._timeout);
                            angular.element(element[0].parentNode)[0].style.bottom = -element[0].offsetHeight + 'px';
                        }
                        scope._timeout = $timeout(function(){
                            scope._timeout = null;
                            angular.element(element[0].parentNode)[0].style.bottom = scope.initialBottom + 'px';
                        },100);

                    });
                }else{
                    angular.element(element[0].parentNode).removeClass('mobile');
                }
            };

            init();

        }
    }

}]);