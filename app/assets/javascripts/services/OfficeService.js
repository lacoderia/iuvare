'use strict';

iuvare.factory('OfficeService', ['$http', '$q', "$state", 'SessionService', 'DEFAULT_VALUES', function($http, $q, $state, SessionService, DEFAULT_VALUES){

    var service = {
        offices: [],
        getOffices: getOffices

    };
    return service;

    function getOffices() {
        var officesServiceURL = '/offices/ordered_by_name.json';

        return $http.get(officesServiceURL, {})
            .success(function(data){
                console.log(data);

                if(data.success){
                    service.offices = data.result.goals;
                }
            });
    };

}]);