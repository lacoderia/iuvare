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
                        $state.go('business.cycle');
                    }
                }
            },
            function(response){
                console.log(response)
            }
        );

    };

    var signUp = function(user, token){
        /*user = {
            email: "luis.sanchez.franco@gmail.com", first_name: "Juan", iuvare_id: "5667", last_name: "Perez", password: "12345678", password_confirmation: "12345678", placement_iuvare_id: "3445", placement_xango_id: "3445", sponsor_iuvare_id: "456", sponsor_xango_id: "346", xango_id: "6768"
        }*/
        var registerServiceURL = '/users.json';
        $http.post(registerServiceURL, {
                token: token,
                user: user
        }).then(
            function(data){
                console.log(data)
            },
            function (response) {
                console.log(response)
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