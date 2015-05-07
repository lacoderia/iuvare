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

    // Function that triggers file input click
    $scope.openPictureSelector = function(event) {
        $(event.target).siblings('input').trigger('click');
        return false;
    };

    // Function that uploads a picture file to server
    $scope.uploadPicture = function(brick){
        console.log(brick.file);

        brick.uploading = true;
        brick.error = false;

        setTimeout(function(){
            brick.uploading = false;


            // Aquí debemos guardar la imagen en el servidor

            
            brick.error = true;

            $scope.$digest();

        }, 1000);

    };

    // Function that reads the image file and adds it to the masonry grid
    $scope.addPicture = function(element) {
        var input = $(element);

        if (input[0].files && input[0].files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                var brick = {
                    src: e.target.result,
                    uploading: false,
                    error: false,
                    file: input[0].files[0]
                };

                $scope.bricks.push(brick);

                $scope.uploadPicture(brick);

                $scope.$digest();

            };

            reader.readAsDataURL(input[0].files[0]);
        }
    };

    // Method to remove a picture
    $scope.removePicture = function(brick){
        $scope.bricks.splice($scope.bricks.indexOf(brick), 1);
    };

    // Method to init the controller's default state
    $scope.initController = function(){

        $scope.$emit('setCurrentSection');

        $scope.sectionTitle = $scope.currentSubsection.title;

    };

    $scope.initController();
}]);
