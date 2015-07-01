'use strict';

iuvare.controller('PaymentController', ["$scope", "$rootScope", "SessionService", function($scope, $rootScope, SessionService){

    // Array that holds the products
    $scope.products = undefined;
    $scope.description = undefined;


    // Method to init the controller's default state
    $scope.initController = function(){

        $scope.products = SessionService.$get().getAccessLevel().payment_options;
        $scope.description = SessionService.$get().getAccessLevel().message;

    };

    $scope.initController();

}]);
