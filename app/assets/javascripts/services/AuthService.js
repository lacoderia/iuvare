'use strict';

iuvare.factory('AuthService', ['$http', '$q', function($http, $q){

    var loginServiceURL = '/users/sign_in';

    var signIn = function (credentials) {

        var deferred = $q.defer();
        var promise = deferred.promise;

        $http.post(loginServiceURL,
            credentials
        );

        promise.then(
            function(data){
                console.log(data)
            },
            function(response){
                console.log(response)
            }
        );

    };

    var signUp = function(user){

        console.log(user)
        /*var deferred = $q.defer();
        var promise = deferred.promise;

        $http.post(loginServiceURL,
            {
                token: $('meta[name=csrf-token]').attr('content'),
                user: user
            }
        );

        promise.then(
            function(data){
                console.log(data)
            },
            function(response){
                console.log(response)
            }
        );*/

    };
    
    var isAuthenticated = function () {
        return true;
    };

    return{
        signIn: signIn,
        signUp: signUp,
        isAuthenticated: isAuthenticated
    }

}]);