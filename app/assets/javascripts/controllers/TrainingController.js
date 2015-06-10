'use strict';

iuvare.controller('TrainingController', ["$scope", "$rootScope", "AssetService", "AuthService", "SessionService", "DEFAULT_VALUES", function($scope, $rootScope, AssetService, AuthService, SessionService, DEFAULT_VALUES){

    // Private variables
    var ASSET_TYPE = DEFAULT_VALUES.ASSETS.TYPES.TRAINING;
    var playlable = true;

    // Public variables
    $scope.ASSET_PATH = DEFAULT_VALUES.ASSETS.PATH;
    $scope.assetList = [];
    $scope.assetQuery = undefined;

    $scope.areAssetsAvailable = function(){
        return ($scope.assetList.length)? true : false;
    };

    // Method that toggles a goal's information form
    $scope.toggleAssetInfo = function(assetItem){

        angular.forEach($scope.assetList, function(asset){
            if(asset.id != assetItem.id){
                asset.showInfo = false;
            }
        });

        (assetItem.showInfo)? assetItem.showInfo = false : assetItem.showInfo = true;

    };

    $scope.isPlaylable = function () {
        return playlable;
    };

    // Method to init the controller's default state
    $scope.initController = function(){

        $scope.$emit('setCurrentSection');

        $scope.sectionTitle = $scope.currentSubsection.title;

        $scope.startSpin('container-spinner');

        AssetService.getAssetsByType(ASSET_TYPE)
            .success(function(data){
                if(data.success){
                    $scope.assetList = AssetService.assets;
                    $scope.stopSpin('container-spinner');
                }
            })
            .error(function (error, status) {
                console.log('Hubo un error al obtener los seminarios.');
            });
    };

    $scope.initController();

}]);
