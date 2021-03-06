/*
 *   ProfileController as profileCtrl
 *   Description: Controller for Profile section view
 * */

'use strict';

iuvare.controller('ProfileController', ["$http", "$scope", "$rootScope", "AuthService", "SessionService", "ProfileService", "DEFAULT_VALUES", function($http, $scope, $rootScope, AuthService, SessionService, ProfileService, DEFAULT_VALUES){

    $scope.currentUser = {
        name: undefined,
        lastName: undefined,
        email: '',
        iuvareId: undefined,
        xangoId: undefined,
        picture: undefined,
        pictureUrl: undefined,
        password: undefined,
        confirmation: undefined
    };

    $scope.showPasswordForm = false;

    $scope.$watch('currentUser.pictureUrl', function(){

        if($scope.currentUser && $scope.currentUser.pictureUrl) {
            var imageContainer = $('.profile-form').find('.picture');
            var image = imageContainer.find('img');
            image.hide();

            $('<img/>')
                .attr("src", $scope.currentUser.pictureUrl)
                .load(function() {
                    image.attr('src', $scope.currentUser.pictureUrl);

                    var ratio = this.width / this.height;

                    // Si la imagen es horizontal, el alto debe ser el del contenedor y el ancho debe ser proporcional
                    if (this.width > this.height) {
                        image.height(imageContainer.height());
                        image.width(imageContainer.height() * ratio);
                    } else {
                        // Si la imagen es vertical o cuadrada, el ancho debe ser el del contenedor y el alto debe ser proporcional
                        image.width(imageContainer.width());
                        image.height(imageContainer.width() / ratio);
                    }

                    image.show();
                })
                .error(function() {
                    $scope.showAlert('Ocurrió un error al procesar la imagen. Inténtalo nuevamente.', 'danger', false);
                });
        }

    });

    $scope.openProfilePictureSelector = function(event) {
        $(event.target).siblings('input').trigger('click');
        return false;
    };

    $scope.selectProfilePicture = function(element) {
        var input = $(element);
        if (input[0].files && input[0].files[0]) {

            var imageContainer = $(element).parents('.profile-form').find('.picture');
            imageContainer.removeClass('no-background');

            var reader = new FileReader();

            reader.onload = function (e) {
                imageContainer.addClass('no-background');

                var image = imageContainer.find('img');
                image.attr('src', e.target.result);
                $scope.currentUser.picture = e.target.result;

                var loadedImage = new Image();
                loadedImage.src = reader.result;

                loadedImage.onload = function(){
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
                }

                loadedImage.onerror = function() {
                    $scope.showAlert('Ocurrió un error al procesar la imagen. Intenta nuevamente.', 'danger', false);
                }
            };

            reader.onerror = function (error) {
                $scope.showAlert('Ocurrió un error al procesar la imagen. Intenta nuevamente.', 'danger', false);
            };

            reader.readAsDataURL(input[0].files[0]);
        }
    };

    $scope.updateProfile = function() {
        if ($scope.profileForm.$valid) {

            $scope.startSpin('container-spinner');

            var user = {
                first_name: $scope.currentUser.name,
                last_name: $scope.currentUser.lastName,
                email: $scope.currentUser.email,
                picture: $scope.currentUser.picture,
                iuvare_id: $scope.currentUser.iuvareId
            };

            ProfileService.updateProfile(user)
                .success(function(data){
                    if(data.success){
                        SessionService.$get().setFirstName(data.result.first_name);
                        SessionService.$get().setLastName(data.result.last_name);
                        SessionService.$get().setPicture(data.result.picture);
                        SessionService.$get().setIuvareId(data.result.iuvare_id);
                        $scope.currentUser.isIuvareId = SessionService.$get().getIuvareId();

                        $scope.showAlert('Los datos fueron actualizados con éxito.', 'success');
                    }else{
                      $scope.showAlert(data.error, 'danger', false);
                      console.log(data.error);
                    }
                })
                .error(function(response){
                    $scope.showAlert('Ocurrió un error al actualizar tus datos. Intenta nuevamente.', 'danger', false);
                    console.log('Ocurrió un error al actualizar tus datos.');
                })
                .finally(function(){
                  $scope.stopSpin('container-spinner');
                });

        }
    };

    $scope.togglePasswordForm = function(){
        $scope.resetPasswordForm();
        $scope.showPasswordForm = !$scope.showPasswordForm;
    };

    $scope.resetPasswordForm = function(){
        $scope.currentUser.password = null;
        $scope.currentUser.confirmation = null;
        $scope.passwordForm.$setPristine();
        $scope.passwordForm.$setUntouched();
    };

    $scope.updatePassword = function() {
        if ($scope.passwordForm.$valid) {

            var user = {
                password: $scope.currentUser.password,
                password_confirmation: $scope.currentUser.password_confirmation
            };

            $scope.startSpin('container-spinner');

            ProfileService.updateProfile(user)
                .success(function(data){
                    if(data.success){
                        $scope.resetPasswordForm();
                        $('meta[name=csrf-token]').attr('content', data.result.csrf.csrf);
                        $http.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');

                        $scope.showAlert('La contraseña fue actualizada con éxito.', 'success');
                        $scope.stopSpin('container-spinner');
                        $scope.togglePasswordForm();
                    }
                })
                .error(function(response){
                    $scope.showAlert('Ocurrió un error al actualizar la contraseña. Intenta nuevamente.', 'danger', false);
                    console.log('Ocurrió un error al actualizar la contraseña. Intenta nuevamente.');
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
            isIuvareId: SessionService.$get().getIuvareId(),
            xangoId: SessionService.$get().getXangoId(),
            picture: undefined,
            pictureUrl: SessionService.$get().getPicture(),
            password: undefined,
            confirmation: undefined,
            expirationDate: SessionService.$get().getPaymentExpiration(),
            accessLevel: SessionService.$get().getAccessLevel()
        };

    };

    $scope.initController();
}]);
