'use strict';

iuvare.controller('AudioController', ["$scope", "$rootScope", "AssetService", "AuthService", "SessionService", "DEFAULT_VALUES", function($scope, $rootScope, AssetService, AuthService, SessionService, DEFAULT_VALUES){

    // Private variables
    var ASSET_TYPE = DEFAULT_VALUES.ASSETS.TYPES.AUDIO;
    var ASSET_HISTORIC_TYPE = DEFAULT_VALUES.ASSETS.HISTORIC_TYPES.AUDIO;
    var playable = true;

    //Public variables
    $scope.assetTextLoaded = false;
    $scope.assetListLoaded = false;

    $scope.ASSET_PATH = DEFAULT_VALUES.ASSETS.FULL_PATH;
    $scope.VIEWS = {
        TEXT_VIEW : 'textView',
        PLAY_VIEW : 'playView'
    };
    $scope.selectedView = '';
    $scope.assetText = undefined;
    $scope.assetList = [];
    $scope.assetQuery = undefined;

    $scope.isAssetTextLoaded = function(){
        return $scope.assetTextLoaded;
    };

    $scope.isAssetListLoaded = function(){
        return $scope.assetListLoaded;
    };

    $scope.isAssetTextEmpty = function(){
        return ($scope.assetText == '' ? true : false);
    };

    $scope.isAssetListEmpty = function(){
        return ($scope.assetList.length ? false : true);
    };

    $scope.resetAssetsLoaded = function(){
        $scope.assetTextLoaded = false;
        $scope.assetText = '';

        $scope.aseetListLoaded = false;
        $scope.assetList = [];
    };

    $scope.getAssetText = function() {
        $scope.startSpin('container-spinner');
        $scope.resetAssetsLoaded();

        AssetService.getHistoricAssetsByType(ASSET_HISTORIC_TYPE)
            .success(function(data){
                if(data.success){
                    $scope.assetText = AssetService.historicAssets;
                    $scope.stopSpin('container-spinner');
                    $scope.assetTextLoaded = true;
                }
            })
            .error(function (error, status) {
                $scope.showAlert('Ocurrió un error al obtener los audios.', 'danger', false);
                console.log('Ocurrió un error al obtener los audios.');
            });
    };

    $scope.getAssetList = function() {
        $scope.startSpin('container-spinner');
        $scope.resetAssetsLoaded();

        AssetService.getAssetsByType(ASSET_TYPE)
            .success(function(data){
                if(data.success){
                    $scope.assetList = AssetService.assets;
                    $scope.stopSpin('container-spinner');
                    $scope.assetListLoaded = true;
                }
            })
            .error(function (error, status) {
                $scope.showAlert('Ocurrió un error al obtener los audios.', 'danger', false);
                console.log('Ocurrió un error al obtener los audios.');
            });
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

    $scope.isSelectedView = function(viewCode){
        return ($scope.selectedView == viewCode);
    };

    $scope.changeView = function(viewCode){
        $scope.selectedView = viewCode;

        switch(viewCode) {
            case $scope.VIEWS.TEXT_VIEW:
                $scope.getAssetText();
                break;
            case $scope.VIEWS.PLAY_VIEW:
                $scope.getAssetList();
                break;
            default:
                break;
        }

    };

    $scope.isPlayable = function () {
        return playable;
    };

    // Method to init the controller's default state
    $scope.initController = function(){

        $scope.$emit('setCurrentSection');
        $scope.sectionTitle = $scope.currentSubsection.title;

        $scope.changeView($scope.VIEWS.TEXT_VIEW);
    };

    $scope.initController();

}]);
