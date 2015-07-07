'use strict';

iuvare.factory('ProgressService', ['$http', '$q', 'DEFAULT_VALUES', function($http, $q, DEFAULT_VALUES){

    var getProgress = function(){

        var progressServiceURL = '/users/progress.json';
        service.funnelData = [];

        return $http.get(progressServiceURL, {})
            .success(function(data){
                if(data.success){
                    angular.forEach(data.result, function(progressItem, key){

                        var statusTitle = (DEFAULT_VALUES.CONTACT_STATUS[(key).toUpperCase()]).title;
                        var progressValue = (DEFAULT_VALUES.CONTACT_STATUS[(key).toUpperCase()]).progress_value;

                        var funnelItem = {
                            title: statusTitle,
                            value: progressValue,
                            real_value: progressItem
                        };

                        service.funnelData.push(funnelItem);
                    });
                }
            });

        return service.funnelData;
    };


    var service = {
        funnelData: [],
        getProgress: getProgress
    };

    return service;

}]);