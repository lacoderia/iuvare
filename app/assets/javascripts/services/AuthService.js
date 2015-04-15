'use strict';

iuvare.factory('AuthService', ['$http', '$q', "$state", 'SessionService', function($http, $q, $state, SessionService){

    var signIn = function (credentials) {
        var loginServiceURL = '/users/sign_in.json';
        return $http.post(loginServiceURL, {
            user: credentials
        }).then(
            function(data){
                if(data){
                    var result = data.data.result;
                    if(result.id){
                        SessionService.createSession(result.id, result.first_name, result.last_name, result.email, result.xango_id, result.iuvare_id, result.sponsor_xango_id, result.sponsor_iuvare_id, result.placemente_xango_id, result.placemente_iuvare_id);
                        $state.go('business.cycle');
                    }
                }
            },
            function(response){
                return response.data.error;
            }
        );
    };

    var signUp = function(user, token){

        var registerServiceURL = '/users.json';
        return $http.post(registerServiceURL, {
                token: token,
                user: user
        }).then(
            function(data){
                var result = data.data.result;
                if(result.id){
                    SessionService.createSession(result.id, result.first_name, result.last_name, result.email, result.xango_id, result.iuvare_id, result.sponsor_xango_id, result.sponsor_iuvare_id, result.placemente_xango_id, result.placemente_iuvare_id);
                    $state.go('business.cycle');
                }
            },
            function (response) {
                return response.data.error;
            }
        );
    };

    var getCurrentSession = function(){
        var sessionServiceURL = '/session.json';
        return $http.get(sessionServiceURL, {});

    };
    
    var isAuthenticated = function () {
        return (SessionService.$get())? true : false;
    };

    return{
        signIn: signIn,
        signUp: signUp,
        isAuthenticated: isAuthenticated,
        getCurrentSession: getCurrentSession
    }

}]);