'use strict';

iuvare.factory('AssetService', ['$http', '$q', "$state", 'SessionService', 'DEFAULT_VALUES', function($http, $q, $state, SessionService, DEFAULT_VALUES){

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
                        });
                    }
                }
                return 'TEXTO DE SUCCESS';
            });
    };

    var service = {
        assets: [],
        getAssetsByType: getAssetsByType
    };

    return service;

}]);