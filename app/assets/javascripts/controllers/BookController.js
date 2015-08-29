'use strict';

iuvare.controller('BookController', ["$scope", "$rootScope", "AssetService", "AuthService", "SessionService", "DEFAULT_VALUES", function($scope, $rootScope, AssetService, AuthService, SessionService, DEFAULT_VALUES){

    // Private variables
    var ASSET_HISTORIC_TYPE = DEFAULT_VALUES.ASSETS.HISTORIC_TYPES.BOOK;

    //Public variables
    $scope.pageLoaded = false;

    $scope.ASSET_PATH = DEFAULT_VALUES.ASSETS.PATH;
    $scope.assetText = undefined;

    $scope.isAssetTextAvailable = function(){
        return ($scope.assetText)? true : false;
    };

    // Method to init the controller's default state
    $scope.initController = function(){

        $scope.$emit('setCurrentSection');

        $scope.sectionTitle = $scope.currentSubsection.title;

        $scope.startSpin('container-spinner');

        AssetService.getHistoricAssetsByType(ASSET_HISTORIC_TYPE)
            .success(function(data){
                if(data.success){
                    $scope.assetText = AssetService.historicAssets;
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
