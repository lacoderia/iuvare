'use strict';

iuvare.factory('AuthService', ['$http', '$q', function($http, $q){


    var signIn = function (credentials) {

        var loginServiceURL = '/users/sign_in.json';

        $http.post(loginServiceURL, {
            user: credentials
        }).then(
            function(data){
                console.log(data)
            },
            function(response){
                console.log(response)
            }
        );

    };

    var signUp = function(user){

        var registerServiceURL = 'users.json';
        var deferred = $q.defer();
        var promise = deferred.promise;

        $http.post(registerServiceURL,
            {
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
        );

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