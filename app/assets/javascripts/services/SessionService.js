'use strict';

iuvare.factory('SessionService', ['UserService', function(UserService){

    var Session = undefined;

    var createSession = function (id, firstName, lastName, email, xangoId, xangoRank, iuvareId, sponsorXangoId, sponsorIuvareId, placementeXangoId, placementeIuvareId, active, downlinePosition, paymentExpiration, picture, uplineId) {
        Session = UserService.createUser(id, firstName, lastName, email, xangoId, xangoRank, iuvareId, sponsorXangoId, sponsorIuvareId, placementeXangoId, placementeIuvareId, active, downlinePosition, paymentExpiration, picture, uplineId);
    };

    var $get = function(){
        return Session;
    };


    return{
        createSession: createSession,
        $get: $get
    };

}]);