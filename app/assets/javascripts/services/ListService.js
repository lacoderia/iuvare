'use strict';

iuvare.factory('ListService', ['$http', '$q', "$state", 'SessionService', 'DEFAULT_VALUES', function($http, $q, $state, SessionService, DEFAULT_VALUES){

    var replaceContact = function (replacementContact) {
        for(var contactIndex=0; contactIndex<service.contacts.length; contactIndex++){

        }
    };

    var getContactList = function(){

        var contactServiceURL = '/contacts/by_user.json?user_id=' + SessionService.$get().getId();
        service.contacts = [];

        return $http.get(contactServiceURL, {})
            .success(function(data){
                if(data.success){
                    if(data.result){
                        service.contacts = data.result.contacts;
                        angular.forEach(service.contacts, function(contact){
                            contact.showInfo = false;
                        });
                    }
                }
                return 'TEXTO DE SUCCESS';
            });


        return service.contacts;
    };

    var saveContact = function(contact){

        var contactServiceURL = '/contacts.json';
        contact.user_id = SessionService.$get().getId();

        return $http.post(contactServiceURL, {
            contact: contact
        })
            .success(function (data) {
                var contact = {
                    id: data.result.id,
                    user_id: data.result.user_id,
                    name: data.result.name,
                    email: data.result.email,
                    phone: data.result.phone,
                    description: data.result.description,
                    status: data.result.status,
                    showInfo: false
                };
                service.contacts.push(contact);
            });

        return service.contacts;
    };

    var updateContact = function (contact) {

        var contactServiceURL = '/contacts/' + SessionService.$get().getId() + '.json';

        var tempContact = {
            user_id: contact.user_id,
            name: contact.name,
            email: contact.email,
            phone: contact.phone,
            description: contact.description,
        };


        if(DEFAULT_VALUES.CONTACT_STATUS.RULED_OUT.code == contact.status || DEFAULT_VALUES.CONTACT_STATUS.REGISTERED.code == contact.status){
            tempContact.status = contact.status;
        }

        return $http.put(contactServiceURL, {
            contact: tempContact
        })
            .success(function (data) {
                var contact = {
                    id: data.result.id,
                    user_id: data.result.user_id,
                    name: data.result.name,
                    email: data.result.email,
                    phone: data.result.phone,
                    description: data.result.description,
                    status: data.result.status,
                    showInfo: false
                };


            });

    };

    var service = {
        contacts: [],
        getContactList: getContactList,
        saveContact: saveContact,
        updateContact: updateContact
    };

    return service;

}]);