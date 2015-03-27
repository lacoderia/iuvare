'use strict';

iuvare.factory('AuthService', ['$http', '$q', "$state", 'SessionService', function($http, $q, $state, SessionService){


    var signIn = function (credentials) {

        var loginServiceURL = '/users/sign_in.json';

        $http.post(loginServiceURL, {
            user: credentials
        }).then(
            function(data){
                if(data){

                    var result = data.data.result;
                    if(result.id){
                        SessionService.createSession(result.id, result.first_name, result.last_name, result.email, result.xango_id, result.iuvare_id, result.sponsor_xango_id, result.sponsor_iuvare_id, result.placemente_xango_id, result.placemente_iuvare_id);
                        $state.go('business');
                    }
                }
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
        return (SessionService.getId())? true : false;
    };

    return{
        signIn: signIn,
        signUp: signUp,
        isAuthenticated: isAuthenticated
    }

}]);