'use strict';

iuvare.factory('SessionService', ['UserService', function(UserService){

    var Session = undefined;

    var createSession = function (id, firstName, lastName, email, xangoId, xangoRank, iuvareId, sponsorXangoId, sponsorIuvareId, placementXangoId, placementIuvareId, active, downlinePosition, paymentExpiration, picture, uplineId, testScores, downlineCount) {
        Session = UserService.createUser(id, firstName, lastName, email, xangoId, xangoRank, iuvareId, sponsorXangoId, sponsorIuvareId, placementXangoId, placementIuvareId, active, downlinePosition, paymentExpiration, picture, uplineId, testScores, downlineCount);
    };

    var destroySession = function() {
        Session = undefined;
    }

    var $get = function(){
        return Session;
    };


    return{
        destroySession: destroySession,
        createSession: createSession,
        $get: $get
    };

}]);