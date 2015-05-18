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
                                            //{src: $sce.trustAsResourceUrl(DEFAULT_VALUES.ASSETS.PATH + asset.source + '.m4v'), type: "video/mp4"},
                                            //{src: $sce.trustAsResourceUrl(DEFAULT_VALUES.ASSETS.PATH + asset.source + '.webm'), type: "video/webm"},
                                            //{src: $sce.trustAsResourceUrl(DEFAULT_VALUES.ASSETS.PATH + asset.source + '.ogv'), type: "video/ogg"}

                                            {src: $sce.trustAsResourceUrl(DEFAULT_VALUES.ASSETS.PATH + 'in2teck_promo' + '.mp4')},
                                            {src: $sce.trustAsResourceUrl(DEFAULT_VALUES.ASSETS.PATH + 'in2teck_promo' + '.m4v'), type: "video/mp4"},
                                            {src: $sce.trustAsResourceUrl(DEFAULT_VALUES.ASSETS.PATH + 'in2teck_promo'+ '.webm'), type: "video/webm"},
                                            {src: $sce.trustAsResourceUrl(DEFAULT_VALUES.ASSETS.PATH + 'in2teck_promo' + '.ogv'), type: "video/ogg"}
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