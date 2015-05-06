'use strict';

iuvare.factory('ListService', ['$http', '$q', "$state", 'SessionService', 'DEFAULT_VALUES', function($http, $q, $state, SessionService, DEFAULT_VALUES){

    var getContactList = function(){

        /*var assetsServiceURL = '/assets/by_asset_type.json?asset_type=' + assetType;
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
            });*/

        return [
            { id:1, name: 'Benjamín Hernández', status: 0 }
        ]
    };

    var saveContact = function(contact){

        /*var assetsServiceURL = '/assets/by_asset_type.json?asset_type=' + assetType;
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
         });*/
        console.log(contact)
        service.contacts.push(contact);
    };

    var service = {
        contacts: [],
        getContactList: getContactList,
        saveContact: saveContact
    };

    return service;

}]);