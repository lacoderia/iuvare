'use strict';

iuvare.factory('InvitationService', ['$http', '$q', "$state", 'SessionService', function($http, $q, $state, SessionService){

    var sendInvitation = function (invitation) {
        var inviteServiceURL = '/invitations.json';

        $http.post(inviteServiceURL, {
            invitation: invitation
        }).then(
            function(data){
                console.log(data)
            },
            function(response){
                console.log(response)
            }
        );
    };

    return{
        sendInvitation: sendInvitation
    }

}]);