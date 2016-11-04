'use strict';

iuvareDirectives.directive('iuAudio', ['$rootScope', '$timeout', function($rootScope, $timeout){

    return{
        restrict: 'E',
        replace: true,
        template:   '<div class="audio">' +
                        '<button class="action-button-purple size-medium" ng-click="play($event)" style="display: none;">Escuchar</button>' +
                        '<audio style="display: none;" controls><source></audio>' +
                        '<div class="no-audio" style="display: block;"></div>' +
                    '</div>',
        scope: {
            source: '@',
            assetPath: '@'
        },
        link: function(scope, element, attrs){

            // Private variables
            var audioElement;
            var buttonElement;
            var noAudioElement;
            var sourceElement;

            // Public variables
            scope.src = scope.assetPath + scope.source;

            scope.play = function($event) {
                $event.stopPropagation();
                $event.preventDefault();

                if(scope.source) {

                    // Show/Hide elements
                    audioElement.style.display = 'block';
                    buttonElement.style.display = 'none';

                    // Getting source element
                    sourceElement = element[0].querySelector('source');
                    try {
                        sourceElement.src = scope.src;
                        audioElement.load();
                    } catch(error) {
                        // Show/Hide elements
                        audioElement.style.display = 'none';
                        buttonElement.style.display = 'none';
                        noAudioElement.style.display = 'block';
                        console.log(error);
                    }
                }
            };

            $timeout(function () {

                if(scope.source) {
                    audioElement = element[0].querySelector('audio');
                    noAudioElement = element[0].querySelector('.no-audio');
                    buttonElement = element[0].querySelector('button');

                    // Show/Hide elements
                    buttonElement.style.display = 'block';
                    noAudioElement.style.display = 'none';
                }

            },0);

        }
    }

}]);
