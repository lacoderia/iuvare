'use strict';

iuvareDirectives.directive('iuAudio', ['$rootScope', '$timeout', function($rootScope, $timeout){

    return{
        restrict: 'E',
        replace: true,
        template:   '<div>' +
                        '<audio style="display: none;" controls><source></audio>' +
                        '<div class="no-audio" style="display: block;">No disponible.</div>' +
                    '</div>',
        scope: {
            source: '@',
            assetPath: '@'
        },
        link: function(scope, element, attrs){

            // Private variables
            var audioElement;
            var noAudioElement;
            var sourceElement;

            // Public variables
            scope.src = scope.assetPath + scope.source;

            $timeout(function () {

                if(scope.source) {
                    audioElement = element[0].querySelector('audio');
                    noAudioElement = element[0].querySelector('.no-audio');

                    // Show/Hide elements
                    audioElement.style.display = 'block';
                    noAudioElement.style.display = 'none';

                    // Getting source element
                    sourceElement = element[0].querySelector('source');
                    try {
                        sourceElement.src = scope.src;
                        audioElement.load();
                    } catch(error) {
                        // Show/Hide elements
                        audioElement.style.display = 'none';
                        noAudioElement.style.display = 'block';
                        console.log(error);
                    }
                }

            },0);

        }
    }

}]);