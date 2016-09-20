'use strict';

iuvare.controller('ConventionController', ["$scope", "$rootScope", "AssetService", "AuthService", "EventService", "SessionService", "DEFAULT_VALUES", function($scope, $rootScope, AssetService, AuthService, EventService, SessionService, DEFAULT_VALUES){

    // Private variables
    var ASSET_TYPE = DEFAULT_VALUES.ASSETS.TYPES.CONVENTION;
    var playable = true;

    // Public variables
    $scope.nextEventLoaded = false;
    $scope.assetListLoaded = false;

    $scope.VIEWS = {
        NEXT_VIEW : 'nextView',
        PLAY_VIEW : 'playView'
    };
    $scope.selectedView = $scope.VIEWS.NEXT_VIEW;
    $scope.nextEvent = undefined;
    $scope.assetList = [];
    $scope.assetQuery = undefined;

    $scope.isAssetListEmpty = function(){
        return ($scope.assetList.length)? false : true;
    };

    $scope.isNextEventEmpty = function(){
        return ($scope.nextEvent != undefined) ? false : true;
    };

    $scope.resetAssetsLoaded = function(){
        $scope.nextEventLoaded = false;
        $scope.nextEvent = undefined;

        $scope.assetListLoaded = false;
        $scope.assetList = [];
    };

    $scope.getNextEvent = function() {
        $scope.startSpin('container-spinner');
        $scope.resetAssetsLoaded();

        EventService.getEvent(ASSET_TYPE)
            .success(function(data){
                if(data.success && EventService.event) {
                    $scope.nextEvent = angular.copy(EventService.event);
                    $scope.nextEventLoaded = true;
                }
                $scope.stopSpin('container-spinner');
            })
            .error(function(){
                console.log('Ocurrió un error al obtener el siguiente seminario.') ;
            });
    };

    $scope.getAssetList = function() {
        $scope.startSpin('container-spinner');
        $scope.resetAssetsLoaded();

        AssetService.getAssetsByType(ASSET_TYPE)
            .success(function(data){
                if(data.success){
                    $scope.assetList = AssetService.assets;
                    $scope.assetListLoaded = true;
                }
                $scope.stopSpin('container-spinner');
            })
            .error(function (error, status) {
                $scope.showAlert('Ocurrió un error al obtener los seminarios.', 'danger', false);
                console.log('Ocurrió un error al obtener los seminarios.');
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
            case $scope.VIEWS.NEXT_VIEW:
                $scope.getNextEvent();
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

        $scope.changeView($scope.VIEWS.NEXT_VIEW);
    };

    $scope.initController();

}]);
