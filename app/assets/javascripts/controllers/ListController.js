'use strict';

iuvare.controller('ListController', ["$scope", "$log", "$rootScope", "AuthService", "ListService", "SessionService", "DEFAULT_VALUES", function($scope, $log, $rootScope, AuthService, ListService, SessionService, DEFAULT_VALUES){

    //Private variables
    var addingContact = false;
    var editingContact = false;

    //Public variables
    $scope.contactList = [];
    $scope.selectedContact = {
        id: undefined,
        user_id: undefined,
        name: undefined,
        email: undefined,
        phone: undefined,
        description: undefined,
        status: undefined
    };
    $scope.contactQuery = undefined;

    // Method to init the controller's default state
    $scope.initController = function(){

        $scope.$emit('setCurrentSection');

        $scope.sectionTitle = $scope.currentSubsection.title;

        ListService.getContactList()
            .success(function(data){
                if(data.success){
                    $scope.contactList = angular.copy(ListService.contacts);
                }

            })
            .error(function (error, status) {
                console.log('Hubo un error al obtener los contactos.');
            });

    };

    // Method that toggles a goal's information form
    $scope.toggleContactInfo = function(contactItem){

        angular.forEach($scope.assetList, function(contact){
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
        ListService.saveContact($scope.selectedContact)
            .success(function(data){
                if(data.success){
                    $scope.contactList = ListService.contacts;
                }
            })
            .error(function (error, status) {
                console.log('Hubo un error al guardr el contacto.');
                console.log(error);
            })
            .finally(function () {
                $scope.showContactListView();
            });
    };

    $scope.updateContact = function () {
        ListService.updateContact($scope.selectedContact)
            .success(function(data){
                if(data.success){
                    $scope.selectedContact.name = data.result.name;
                    $scope.selectedContact.email = data.result.email;
                    $scope.selectedContact.phone = data.result.phone;
                    $scope.selectedContact.description = data.result.description;
                    $scope.selectedContact.status = data.result.status;
                }

            })
            .error(function (error, status) {
                console.log('Hubo un error al actualizar el contacto.');
                console.log(error);
            })
            .finally(function () {
                $scope.showContactListView();
            });

    };

    $scope.deleteContact = function (contactId) {
        ListService.deleteContact(contactId);
    };

    $scope.showContactListView = function () {
        addingContact = false;
        editingContact = false;
        $scope.selectedContact = false;
    };

    $scope.initController();

}]);
