'use strict';

iuvare.factory('IuvareUserService', ['$http', function($http){

    var getIuvareUser = function(iuvareId){
        var iuvareUserServiceURL = '/users/by_iuvare_id.json?iuvare_id=' + iuvareId;
        return $http.get(iuvareUserServiceURL);
    };

    return {
        getIuvareUser: getIuvareUser
    }

}]);
