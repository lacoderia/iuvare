/*
 *   ProfileController as profileCtrl
 *   Description: Controller for Profile section view
 * */

'use strict';

iuvare.controller('ProfileController', ["$scope", "$rootScope", "AuthService", "SessionService", "UserService", "DEFAULT_VALUES", function($scope, $rootScope, AuthService, SessionService, UserService, DEFAULT_VALUES){

    $scope.currentUser = {
        name: undefined,
        lastName: undefined,
        email: undefined,
        iuvareId: undefined,
        xangoId: undefined
    };

    $scope.openProfilePictureSelector = function(event) {
        $(event.target).siblings('input').trigger('click');
        return false;
    };

    $scope.selectProfilePicture = function(element) {
        var input = $(element);
        if (input[0].files && input[0].files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                var imageContainer = $(element).parents('.profile-form').find('.picture');
                var image = imageContainer.find('img');
                image.attr('src', e.target.result);
                $scope.currentUser.picture = e.target.result;

                var loadedImage = new Image();
                loadedImage.src = reader.result;

                var ratio = loadedImage.width / loadedImage.height;

                // Si la imagen es horizontal, el alto debe ser el del contenedor y el ancho debe ser proporcional
                if (loadedImage.width > loadedImage.height) {
                    image.height(imageContainer.height());
                    image.width(imageContainer.height() * ratio);
                } else {
                    // Si la imagen es vertical o cuadrada, el ancho debe ser el del contenedor y el alto debe ser proporcional
                    image.width(imageContainer.width());
                    image.height(imageContainer.width() / ratio);
                }

            };

            reader.readAsDataURL(input[0].files[0]);
        }
    };

    $scope.updateProfile = function() {
        if ($scope.profileForm.$valid) {

            var user = $scope.currentUser;

            ProfileService.submitWeekCalendar(weekCalendar)
                .success(function (data) {

                })
                .error(function (response) {

                });

        }
    };


    // Method to init the controller's default state
    $scope.initController = function(){
        $scope.$emit('setCurrentSection');

        $scope.sectionTitle = $scope.currentSubsection.title;

        $scope.currentUser = {
            name: SessionService.$get().getFirstName(),
            lastName: SessionService.$get().getLastName(),
            email: SessionService.$get().getEmail(),
            iuvareId: SessionService.$get().getIuvareId(),
            xangoId: SessionService.$get().getXangoId()
        };

    };

    $scope.initController();
}]);
