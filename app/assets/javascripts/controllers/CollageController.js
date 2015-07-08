/*
 *   CycleController as cycleCtrl
 *   Description: Controller for Cycle section view
 * */

'use strict';

iuvare.controller('CollageController', ["$scope", "$rootScope", "CollageService", "SessionService", "DEFAULT_VALUES", function($scope, $rootScope, CollageService, SessionService, DEFAULT_VALUES){

    $scope.bricks = [];

    // Function that triggers file input click
    $scope.openPictureSelector = function(event) {
        $(event.target).siblings('input').trigger('click');
        return false;
    };

    // Function that uploads a picture file to server
    $scope.uploadPicture = function(brick){

        brick.uploading = true;
        brick.error = false;

        CollageService.savePicture(brick)
            .success(function(data){
                if(data.success){
                    brick.uploading = false;
                    brick.id = data.result.id;
                }
            })
            .error(function(response){
                brick.error = true;
                $scope.showAlert('La imagen no pudo ser guardada. Intenta nuevamente.', 'danger', false);
                console.log('Ocurrió un error al guardar la imagen.');
            });
    };

    // Function that reads the image file and adds it to the masonry grid
    $scope.addPicture = function(element) {
        var input = $(element);

        if (input[0].files && input[0].files[0]) {
            var reader = new FileReader();

            var newPictureOrder = 0;
            var lastPicture = angular.copy($scope.bricks[$scope.bricks.length - 1]);
            if (lastPicture){
                newPictureOrder = lastPicture.order + 1;
            }

            reader.onload = function (e) {
                var brick = {
                    id: undefined,
                    src: e.target.result,
                    uploading: false,
                    error: false,
                    file: input[0].files[0],
                    order: newPictureOrder
                };

                $scope.bricks.push(brick);

                $scope.uploadPicture(brick);

                $scope.$digest();

            };

            reader.readAsDataURL(input[0].files[0]);
        }
    };

    // Method to remove a picture
    $scope.deletePicture = function(brick){
        if(brick.id){
            brick.uploading = true;

            CollageService.deletePicture(brick)
                .success(function(data){
                    $scope.bricks.splice($scope.bricks.indexOf(brick), 1);

                    setTimeout(function(){
                        $scope.$emit('iso-method', {name:'layout', params:null})
                    }, 0);
                })
                .error(function(response){
                    brick.uploading = false;
                    $scope.showAlert('La imagen no pudo ser eliminada. Intenta nuevamente.', 'danger', false);
                    console.log('Ocurrió un error al eliminar una imagen.');
                });
        }
    };

    // Method to init the controller's default state
    $scope.initController = function(){

        $scope.$emit('setCurrentSection');

        $scope.sectionTitle = $scope.currentSubsection.title;

        $scope.startSpin('container-spinner');

        CollageService.getCollage()
            .success(function(data){
                $scope.bricks = CollageService.bricks;
                $scope.stopSpin('container-spinner');
            })
            .error(function(response){
                $scope.showAlert('No se pudo obtener tu collage. Intenta nuevamente.', 'danger', false);
                console.log('Ocurrió un error al obtener el collage.');
            });
    };

    $scope.initController();
}]);
