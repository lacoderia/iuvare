/*
 *   CycleController as cycleCtrl
 *   Description: Controller for Cycle section view
 * */

'use strict';

iuvare.controller('CollageController', ["$scope", "$rootScope", "CollageService", "SessionService", "DEFAULT_VALUES", function($scope, $rootScope, CollageService, SessionService, DEFAULT_VALUES){

    $scope.bricks = [
        {'src': '/assets/rails.png', 'uploading': false},
        {'src': '/assets/iuvare_logo.png', 'uploading': false},
        {'src': '/assets/bici.jpg', 'uploading': false},
        {'src': '/assets/rails.png', 'uploading': false},
        {'src': '/assets/iuvare_logo.png', 'uploading': false},
        {'src': '/assets/bici.jpg', 'uploading': false},
        {'src': '/assets/rails.png', 'uploading': false},
        {'src': '/assets/iuvare_logo.png', 'uploading': false},
        {'src': '/assets/bici.jpg', 'uploading': false},
        {'src': '/assets/rails.png', 'uploading': false},
        {'src': '/assets/iuvare_logo.png', 'uploading': false},
        {'src': '/assets/bici.jpg', 'uploading': false},
        {'src': '/assets/rails.png', 'uploading': false},
        {'src': '/assets/iuvare_logo.png', 'uploading': false},
        {'src': '/assets/bici.jpg', 'uploading': false},
        {'src': '/assets/rails.png', 'uploading': false},
        {'src': '/assets/iuvare_logo.png', 'uploading': false},
        {'src': '/assets/bici.jpg', 'uploading': false}
    ];

    $scope.xList = [{"name":"a","number":"1","date":"1360413309421","class":"purple"},{"name":"b","number":"5","date":"1360213309421","class":"orange"},{"name":"c","number":"10","date":"1360113309421","class":"blue"},{"name":"d","number":"2","date":"1360113309421","class":"green"},{"name":"e","number":"6","date":"1350613309421","class":"green"},{"name":"f","number":"21","date":"1350613309421","class":"orange"},{"name":"g","number":"3","date":"1340613309421","class":"blue"},{"name":"h","number":"7","date":"1330613309001","class":"purple"},{"name":"i","number":"22","date":"1360412309421","class":"blue"}, {"name":"a","number":"1","date":"1360413309421","class":"purple"},{"name":"b","number":"5","date":"1360213309421","class":"orange"},{"name":"c","number":"10","date":"1360113309421","class":"blue"},{"name":"d","number":"2","date":"1360113309421","class":"green"},{"name":"e","number":"6","date":"1350613309421","class":"green"},{"name":"f","number":"21","date":"1350613309421","class":"orange"},{"name":"g","number":"3","date":"1340613309421","class":"blue"},{"name":"h","number":"7","date":"1330613309001","class":"purple"},{"name":"i","number":"22","date":"1360412309421","class":"blue"}];

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

        setTimeout(function(){
            $scope.$emit('iso-method', {name:'layout', params:null})
        }, 0);
    };

    // Method to init the controller's default state
    $scope.initController = function(){

        $scope.$emit('setCurrentSection');

        $scope.sectionTitle = $scope.currentSubsection.title;

    };

    $scope.initController();
}]);
