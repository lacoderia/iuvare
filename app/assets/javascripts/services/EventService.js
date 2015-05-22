'use strict';

iuvare.factory('EventService', ['$http', '$q', 'DEFAULT_VALUES', function($http, $q, DEFAULT_VALUES){

    var service = {
        event: undefined,
        getEvent: getEvent

    };
    return service;

    function getEvent() {
        var eventServiceURL = '/events/current.json';

        return $http.get(eventServiceURL)
            .success(function(data){
                if(data.success && data.result.length){
                    service.event = data.result[0];
                }
            });
    };

}]);