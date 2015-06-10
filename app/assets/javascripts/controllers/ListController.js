'use strict';

iuvare.controller('ListController', ["$scope", "$log", "$rootScope", "AssetService", "AuthService", "ListService", "SessionService", "DEFAULT_VALUES", function($scope, $log, $rootScope, AssetService, AuthService, ListService, SessionService, DEFAULT_VALUES){

    //Private variables
    var ASSET_TYPE = DEFAULT_VALUES.ASSETS.TYPES.PLAN;
    var addingContact = false;
    var editingContact = false;

    //Public variables
    $scope.CONTACT_STATUS = DEFAULT_VALUES.CONTACT_STATUS;
    $scope.contactList = [];
    $scope.selectedContact = {};
    $scope.contactQuery = undefined;
    $scope.planDropdown = [];
    $scope.plans = [];
    $scope.selectedPlan = undefined;
    $scope.statusTransitions = [];

    // Method that toggles a goal's information form
    $scope.toggleContactInfo = function(contactItem){

        angular.forEach($scope.contactList, function(contact){
            if(contact.id != contactItem.id){
                contact.showInfo = false;
            }
        });

        (contactItem.showInfo)? contactItem.showInfo = false : contactItem.showInfo = true;

    };

    $scope.isContactListEmpty = function () {
        return ($scope.contactList.length)? true : false;
    };

    $scope.isAddingContact = function () {
        return addingContact;
    };

    $scope.isEditingContact = function () {
        return editingContact;
    };

    $scope.createContact = function () {
        addingContact = true;
    };

    $scope.editContact = function (contact) {
        editingContact = true;
        $scope.selectedContact = contact;
    };

    $scope.saveContact = function () {
        if($scope.newContactForm.$valid) {
            $scope.startSpin('container-spinner');

            ListService.saveContact($scope.selectedContact)
                .success(function(data){
                    if(data.success){
                        $scope.contactList = angular.copy(ListService.contacts);
                    }
                })
                .error(function (error, status) {
                    console.log('Hubo un error al guardar el contacto.');
                    console.log(error);
                })
                .finally(function () {
                    $scope.showContactListView();
                    $scope.stopSpin('container-spinner');
                });
        }
    };

    $scope.updateContact = function () {
        if($scope.editContactForm.$valid) {
            $scope.startSpin('container-spinner');

            ListService.updateContact($scope.selectedContact)
                .success(function(data){
                    if(data.success){
                        $scope.contactList = angular.copy(ListService.contacts);
                    }

                })
                .error(function (error, status) {
                    console.log('Hubo un error al actualizar el contacto.');
                    console.log(error);
                })
                .finally(function () {
                    $scope.showContactListView();
                    $scope.stopSpin('container-spinner');
                });
        }
    };

    $scope.deleteContact = function (contactIndex, spinnerId) {
        $scope.startSpin('contact-spinner-' + spinnerId);

        ListService.deleteContact(contactIndex)
            .success(function (data) {
                $scope.contactList = angular.copy(ListService.contacts);
            })
            .error(function (error, status) {
                console.log('Hubo un error al eliminar el contacto.');
                console.log(error);
            })
            .finally(function(){
                $scope.stopSpin('contact-spinner-' + spinnerId);
            });
    };

    $scope.updateFinalStatus = function (contact, finalStatus) {
        $scope.startSpin('contact-spinner-' + contact.id);

        ListService.updateFinalStatus(contact,finalStatus)
            .success(function(data){
                if(data.success){
                    $scope.contactList = angular.copy(ListService.contacts);
                }
            })
            .error(function (error, status) {
                console.log('Hubo un error al actualizar el contacto.');
                console.log(error);
            })
            .finally(function () {
                $scope.showContactListView();
                $scope.stopSpin('contact-spinner-' + contact.id);
            });
    };

    $scope.showContactListView = function () {
        addingContact = false;
        editingContact = false;
        $scope.selectedContact = undefined;
        $scope.selectedPlan = undefined;
    };

    $scope.showButton = function(contact, action){

        var showButton = true;

        switch (action){
            case 'send-video':
                showButton = (contact.status == DEFAULT_VALUES.CONTACT_STATUS.RULED_OUT.code || contact.status == DEFAULT_VALUES.CONTACT_STATUS.REGISTERED.code)? false : true;
                break;
            case 'close-workflow':
                showButton = (contact.status == DEFAULT_VALUES.CONTACT_STATUS.TO_CLOSE.code)? true : false;
                break;
        }

        return showButton;

    };

    $scope.setVideo = function (index) {
        $scope.selectedPlan = $scope.plans[index];
    };

    $scope.sendVideo = function (contact) {
        if($scope.selectedPlan){
            $scope.startSpin('contact-spinner-' + contact.id);

            ListService.sendVideo(contact.id, $scope.selectedPlan.id)
                    .success(function (data) {
                        $scope.contactList = angular.copy(ListService.contacts);
                        $scope.stopSpin('contact-spinner-' + contact.id);
                    })
                    .error(function (error, status) {
                        console.log('Hubo un erro al enviar un video');
                        console.log(error);
                    });
        }
    };

    $scope.getContactStatus = function (key) {
        return $scope.CONTACT_STATUS[key.toUpperCase()];
    };


    // Method to init the controller's default state
    $scope.initController = function(){

        $scope.$emit('setCurrentSection');

        $scope.sectionTitle = $scope.currentSubsection.title;

        $scope.startSpin('container-spinner');

        ListService.getContactList()
            .success(function(data){
                if(data.success){
                    $scope.contactList = angular.copy(ListService.contacts);

                    AssetService.getAssetsByType(ASSET_TYPE)
                        .success(function (data) {
                            if(data.success){
                                angular.forEach(data.result.assets, function (video, index) {
                                    $scope.plans.push(video);
                                    $scope.planDropdown.push({
                                        text: video.title,
                                        click: 'setVideo(' + index + ')'
                                    });
                                });

                                ListService.getStatusTransitions()
                                    .success(function (data) {
                                        $scope.statusTransitions = angular.copy(ListService.transitions);
                                        $scope.stopSpin('container-spinner');
                                    })
                                    .error(function (error, status) {
                                        console.log('Hubo un error al obtener las transiciones de los estatus');
                                        console.log(error);
                                    });
                            }
                        })
                        .error(function (error, status) {
                            console.log('Hubo un error al obtener los planes.');
                        });


                }

            })
            .error(function (error, status) {
                console.log('Hubo un error al obtener los contactos.');
            });

    };

    $scope.initController();

}]);
