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
                                            {src: $sce.trustAsResourceUrl(DEFAULT_VALUES.ASSETS.PATH + asset.source + '.mp4'), type: "video/mp4"},
                                            {src: $sce.trustAsResourceUrl(DEFAULT_VALUES.ASSETS.PATH + asset.source + '.webm'), type: "video/webm"},
                                            {src: $sce.trustAsResourceUrl(DEFAULT_VALUES.ASSETS.PATH + asset.source + '.ogg'), type: "video/ogg"}
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

    var service = {
        assets: [],
        getAssetsByType: getAssetsByType
    };

    return service;

}]);