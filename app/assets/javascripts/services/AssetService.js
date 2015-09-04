'use strict';

iuvare.factory('AssetService', ['$http', '$q', '$sce', '$state', 'SessionService', 'DEFAULT_VALUES', function($http, $q, $sce, $state, SessionService, DEFAULT_VALUES){

    var getAssetsByType = function(assetType){

        var assetsServiceURL = '/assets/by_asset_type.json?asset_type=' + assetType;
        service.assets = [];

        return $http.get(assetsServiceURL, {})
            .success(function(data){
                if(data.success){
                    if(data.result){
                        service.assets = data.result.assets;
                        angular.forEach(service.assets, function(asset){
                            asset.showInfo = false;

                            switch(assetType){
                                case DEFAULT_VALUES.ASSETS.TYPES.PLAN:
                                case DEFAULT_VALUES.ASSETS.TYPES.SEMINAR:
                                case DEFAULT_VALUES.ASSETS.TYPES.CONVENTION:
                                case DEFAULT_VALUES.ASSETS.TYPES.TRAINING:
                                    asset.config = {
                                        preload: "none",
                                        sources : [
                                            {src: $sce.trustAsResourceUrl(asset.stream_url + ".mp4"), type: "video/mp4"},
                                            {src: $sce.trustAsResourceUrl(asset.stream_url + ".webm"), type: "video/webm"},
                                            //{src: $sce.trustAsResourceUrl(DEFAULT_VALUES.ASSETS.PATH + asset.source + '.ogv'), type: "video/ogg"}
                                        ],
                                        theme : "/assets/bower_components/videogular-themes-default/videogular.css"
                                    };

                                    break;
                                default:
                                    break;
                            }

                        });
                    }
                }
            });
    };

    var getHistoricAssetsByType = function(assetType){

        var assetsServiceURL = '/historic_assets/by_type.json?historic_asset_type=' + assetType;
        service.assets = [];
        service.historicAssets = '';

        return $http.get(assetsServiceURL, {})
            .success(function(data){
                if(data.success){
                    if(data.result){
                        service.historicAssets = data.result;
                    }
                }
            });
    };

    var service = {
        assets: [],
        historicAsset: '',
        getAssetsByType: getAssetsByType,
        getHistoricAssetsByType: getHistoricAssetsByType
    };

    return service;

}]);
