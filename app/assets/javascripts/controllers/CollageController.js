/*
 *   CycleController as cycleCtrl
 *   Description: Controller for Cycle section view
 * */

'use strict';

iuvare.controller('CollageController', ["$scope", "$rootScope", "CollageService", "SessionService", "DEFAULT_VALUES", function($scope, $rootScope, CollageService, SessionService, DEFAULT_VALUES){

    $scope.bricks = [
        {'src': '/assets/rails.png', 'uploading': false},
        {'src': '/assets/iuvare_logo.png', 'uploading': false},
        {'src': '/assets/bici.jpg', 'uploading': false}
    ];

    // Method to add a picture to the collage
    $scope.addPicture = function(){
        $scope.bricks.push({'src': '/assets/iuvare_logo.png'});
    };


    // Function that triggers file input click
    $scope.openPictureSelector = function(event) {
        $(event.target).siblings('input').trigger('click');
        return false;
    }

    // Function that reads the image file and adds it to the masonry grid
    $scope.addPicture = function(element) {
        var input = $(element);

        if (input[0].files && input[0].files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                var brick = {
                    src: e.target.result,
                    uploading: true,
                    file: element
                };

                $scope.bricks.push(brick);

                $scope.$digest();

                setTimeout(function(){
                    brick.uploading = false;


                    // Aquí debemos guardar la imagen en el servidor

                    brick.error = true;

                    $scope.$digest();

                }, 1000);

            };

            reader.readAsDataURL(input[0].files[0]);
        }
    }

    // Function that uploads a picture again
    $scope.reloadPicture = function(brick) {
        $scope.addPicture(brick.element);
    }

    // Method to remove a picture
    $scope.removePicture = function(brick){
        $scope.bricks.splice($scope.bricks.indexOf(brick), 1);
    }

    // Method to init the controller's default state
    $scope.initController = function(){

        $scope.$emit('setCurrentSection');

        $scope.sectionTitle = $scope.currentSubsection.title;

    };

    $scope.initController();
}]);
