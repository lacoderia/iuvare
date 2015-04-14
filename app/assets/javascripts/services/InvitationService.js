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

    var sendRequest = function (request) {
        var requestServiceURL = '/requests.json';

        return $http.post(requestServiceURL, {
            request: request
        }).then(
            function(data){
                if(data){
                    return "La solicitud ha sido enviada con éxito.";
                }
            },
            function(response){
                return response.data.error;
            }
        );
    };

    return{
        sendInvitation: sendInvitation,
        sendRequest: sendRequest
    }

}]);