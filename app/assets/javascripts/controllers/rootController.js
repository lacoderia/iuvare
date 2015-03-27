/*
*   RootController as rootCtrl
*   Description: Includes variables and methods for manipulate the layout view
* */

'use strict';

iuvare.controller('RootController', ["$scope", "$rootScope", "SessionService", function($scope, $rootScope, SessionService){

    $scope.userName = (SessionService.getFirstName() || SessionService.getLastName()) ? SessionService.getFirstName() + " " + SessionService.getLastName() : 'Usuario';

    $scope.$on('setCurrentSection', function(){
        console.log('ENTRE SQUI')
    });

}]);