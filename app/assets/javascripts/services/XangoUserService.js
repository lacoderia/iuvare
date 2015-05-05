'use strict';

iuvare.factory('XangoUserService', ['$http', function($http){

    var getXangoUser = function(xangoId){
        var xangoUserServiceURL = '/users/by_xango_id.json?xango_id=' + xangoId;
        return $http.get(xangoUserServiceURL);
    };

    return {
        getXangoUser: getXangoUser
    }

}]);