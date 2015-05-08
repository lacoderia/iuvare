/**
 * Created by Owen on 08/05/15.
 */
//$scope.invitationToken = $location.search().token;
'use strict';

iuvare.controller('PlanController', ["$scope", "$location", "$rootScope", "ListService", "DEFAULT_VALUES", function($scope, $location, $rootScope, ListService, DEFAULT_VALUES){

    //Private variables
    var planToken = undefined;
    var tokenSent = false;
    var validToken = false;

    //Public variables
    $scope.asset = undefined;


    // Method to init the controller's default state
    $scope.initController = function(){
        planToken = $location.search().token;
        ListService.watchVideo(planToken)
            .success(function (data) {
                if(data.success){
                    $scope.asset = data.result.asset;
                    validToken = true;
                }
            })
            .error(function (error, status) {
                console.log(error)
                validToken = false;
            })
            .finally(function () {
                tokenSent = true;
            });
    };

    $scope.isTokenSent = function () {
        return tokenSent;
    };

    $scope.isValidToken = function () {
        return validToken;
    };

    $scope.initController();

}]);