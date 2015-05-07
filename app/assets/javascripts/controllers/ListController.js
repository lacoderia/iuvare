'use strict';

iuvare.controller('ListController', ["$scope", "$rootScope", "AuthService", "ListService", "SessionService", "DEFAULT_VALUES", function($scope, $rootScope, AuthService, ListService, SessionService, DEFAULT_VALUES){

    //Private variables
    var addingContact = false;

    //Public variables
    $scope.contactList = [];
    $scope.contact = {
        name: undefined,
        email: undefined,
        phone: undefined,
        description: undefined
    };
    $scope.contactQuery = undefined;

    // Method to init the controller's default state
    $scope.initController = function(){

        $scope.$emit('setCurrentSection');

        $scope.sectionTitle = $scope.currentSubsection.title;

        $scope.contactList = angular.copy(ListService.getContactList());

    };

    $scope.isContactListEmpty = function () {
        return ($scope.contactList.length)? true : false;
    };

    $scope.isAddingContact = function () {
        return addingContact;
    };

    $scope.createContact = function () {
        addingContact = true;
    };

    $scope.saveContact = function () {
        ListService.saveContact($scope.contact);
    };

    $scope.showContactListView = function () {
        addingContact = false;
    };

    $scope.initController();

}]);
