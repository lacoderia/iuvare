'use strict';

iuvare.factory('InvitationService', ['$http', '$q', "$state", 'SessionService', function($http, $q, $state, SessionService){

    var sendInvitation = function (invitation) {
        var inviteServiceURL = '/invitations.json';

        return $http.post(inviteServiceURL, {
            invitation: invitation
        });
    };

    return{
        sendInvitation: sendInvitation
    }

}]);