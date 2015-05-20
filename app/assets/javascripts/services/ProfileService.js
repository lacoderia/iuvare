'use strict';

iuvare.factory('ProfileService', ['$http', '$q', "$state", 'SessionService', function($http, $q, $state, SessionService){

    var updateProfile = function(user) {
        var profileServiceURL = '/users/' + SessionService.$get().getId() + '.json';

        return $http.put(profileServiceURL, {
            user: user
        });
    };


    return{
        updateProfile: updateProfile
    }

}]);