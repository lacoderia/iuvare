'use strict';

iuvare.controller('BookController', ["$scope", "$rootScope", "AssetService", "AuthService", "SessionService", "DEFAULT_VALUES", function($scope, $rootScope, AssetService, AuthService, SessionService, DEFAULT_VALUES){

    // Private variables
    var ASSET_TYPE = DEFAULT_VALUES.ASSETS.TYPES.BOOK;

    //Public variables
    $scope.pageLoaded = false;

    $scope.ASSET_PATH = DEFAULT_VALUES.ASSETS.PATH;
    $scope.VIEWS = {
        NEXT_VIEW : 'nextView',
        PAST_VIEW : 'pastView'
    };
    $scope.selectedView = $scope.VIEWS.NEXT_VIEW;
    $scope.assetList = [];
    $scope.nextAssetList = [];
    $scope.assetQuery = undefined;

    $scope.areAssetsAvailable = function(){
        return ($scope.assetList.length)? true : false;
    };

    $scope.areNextAssetsAvailable = function(){
        return ($scope.nextAssetList.length)? true : false;
    };

    $scope.isSelectedView = function(viewCode){
        return ($scope.selectedView == viewCode);
    };

    $scope.changeView = function(viewCode){
        $scope.selectedView = viewCode;
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

    // Method to init the controller's default state
    $scope.initController = function(){

        $scope.$emit('setCurrentSection');

        $scope.sectionTitle = $scope.currentSubsection.title;

        $scope.startSpin('container-spinner');

        AssetService.getAssetsByType(ASSET_TYPE)
            .success(function(data){
                if(data.success){
                    $scope.assetList = AssetService.assets;
                    $scope.nextAssetList = AssetService.assets;
                    $scope.stopSpin('container-spinner');
                    $scope.pageLoaded = true;
                }
            })
            .error(function (error, status) {
                $scope.showAlert('Ocurrió un error al obtener los libros.', 'danger', false);
                console.log('Ocurrió un error al obtener los libros.');
            });
    };

    $scope.initController();

}]);
