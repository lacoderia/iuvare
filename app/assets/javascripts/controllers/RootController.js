/*
*   RootController as rootCtrl
*   Description: Includes variables and methods for manipulate the layout view
* */

'use strict';

iuvare.controller('RootController', ["$scope", "$rootScope", "$state", "AuthService", "NavigationService", "SessionService", function($scope, $rootScope, $state, AuthService, NavigationService, SessionService){

    $scope.currentSection = undefined;
    $scope.currentSubsection = undefined;
    $scope.subsections = [];
    $scope.userName = undefined;

    // Listeners del controlador
    $scope.$on('setCurrentSection', function($event){

        var sectionCode = $state.current.section;
        var subsectionCode = $state.current.subsection;

        $scope.currentSection = NavigationService.getSectionByCode(sectionCode);
        $scope.subsections = $scope.currentSection.subsections;
        $scope.currentSubsection = NavigationService.getSubsectionByCode($scope.subsections,subsectionCode);

    });


    $scope.isPublicView = function(){
        return ($state.current.authenticationRequired)? false  : true;
    };

    $scope.isUserAuthenticated = function () {
      return ($state.current.authenticationRequired && AuthService.isAuthenticated());
    };

    var initController = function(){
        $scope.userName = (SessionService.getFirstName() || SessionService.getLastName()) ? SessionService.getFirstName() + " " + SessionService.getLastName() : 'Usuario';
    };

    initController();

}]);
