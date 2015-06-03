'use strict';

iuvare.controller('FAQController', ["$scope", "$rootScope", "$sce", "$location", "AssetService", "AuthService", "SessionService", "DEFAULT_VALUES", function($scope, $rootScope, $sce, $location, AssetService, AuthService, SessionService, DEFAULT_VALUES){

    // Private variables
    var ASSET_TYPE = DEFAULT_VALUES.ASSETS.TYPES.FAQ;

    //Public variables
    $scope.ASSET_PATH = DEFAULT_VALUES.ASSETS.PATH;
    $scope.pdfUrl = undefined;

    // Method to init the controller's default state
    $scope.initController = function(){

        $scope.$emit('setCurrentSection');

        AssetService.getAssetsByType(ASSET_TYPE)
            .success(function(data){
                if(data.success){
                    $scope.pdfUrl = $location.protocol() + "://" + $location.host() + $scope.ASSET_PATH + AssetService.assets[0].source;
                }
            })
            .error(function (error, status) {
                console.log('Hubo un error al obtener el FAQ.');
            });
    };

    $scope.initController();

}]);
