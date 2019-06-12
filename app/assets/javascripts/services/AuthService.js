'use strict';

iuvare.factory('AuthService', ['$http', '$q', "$state", "$rootScope", 'SessionService', function($http, $q, $state, $rootScope, SessionService){

    var signIn = function (credentials) {
        var loginServiceURL = '/users/sign_in.json';
        return $http.post(loginServiceURL, {
            user: {email: credentials.email.toLowerCase(), password: credentials.password} 
        }).then(
            function(data){
                if(data){
                    var result = data.data.result;
                    if(result.id){
                        SessionService.createSession(result.id, result.first_name, result.last_name, result.email, result.xango_id, result.xango_rank, result.iuvare_id, result.sponsor_xango_id, result.sponsor_iuvare_id, result.placemente_xango_id, result.placemente_iuvare_id, result.active, result.downline_position, result.payment_expiration, result.picture, result.upline_id, result.test_scores, result.downline_count, result.access_level);
                        $state.go('business.cycle');
                    }
                    $rootScope.$broadcast('getMonthlyEvent');
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
                    SessionService.createSession(result.id, result.first_name, result.last_name, result.email, result.xango_id, result.xango_rank, result.iuvare_id, result.sponsor_xango_id, result.sponsor_iuvare_id, result.placemente_xango_id, result.placemente_iuvare_id, result.active, result.downline_position, result.payment_expiration, result.picture, result.upline_id, result.test_scores, result.downline_count, result.access_level);
                    $state.go('business.cycle');
                }
            },
            function (response) {
                return response.data.error;
            }
        );
    };

    var logout = function(){
        var logoutServiceURL = '/logout';
        return $http.get(logoutServiceURL).then(
            function(data){
                SessionService.destroySession();
                $state.go('login');
            },
            function (response) {
                return response;
            }
        );
    };

    var recoverPassword = function (forgot) {
        var forgotServiceURL = '/users/password.json';
        return $http.post(forgotServiceURL, {
            utf8: 'V',
            user: forgot
        }).then(
            function(data){
                if(data.data.success){
                    console.log(data);
                    return "Se ha enviado un correo a la dirección que proporcionaste. Sigue las instrucciones para poder recuperar tu contraseña.";
                }
            },
            function(response){
                return response.data.error;
            }
        );
    };

    var resetPassword = function (reset) {
        var resetServiceURL = '/users/password.json';
        return $http.put(resetServiceURL, {
            utf8: 'V',
            user: reset
        }).then(
            function(data){
                if(data.data.success){
                    return "Tu contraseña ha sido restaurada. Ahora puedes ingresar con tu nueva contraseña.";
                }
            },
            function(response){
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
        logout: logout,
        recoverPassword: recoverPassword,
        resetPassword: resetPassword,
        isAuthenticated: isAuthenticated,
        getCurrentSession: getCurrentSession
    }

}]);
