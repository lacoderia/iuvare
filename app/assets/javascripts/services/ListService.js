'use strict';

iuvare.factory('ListService', ['$http', '$q', "$state", 'SessionService', 'DEFAULT_VALUES', function($http, $q, $state, SessionService, DEFAULT_VALUES){

    var getContactById = function (contactId) {

        return _.find(service.contacts, function (contactItem) {
            return contact.id == contactId;
        });
    };

    var replaceContact = function (replacementContact) {
        for(var contactIndex=0; contactIndex<service.contacts.length; contactIndex++){
            var contact = service.contacts[contactIndex];
            if(contact.id == replacementContact.id){
                service.contacts[contactIndex] = replacementContact;
                break;
            }
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
                            contact.order = DEFAULT_VALUES.CONTACT_STATUS[(contact.status).toUpperCase()].order;
                        });
                    }
                }
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
                    showInfo: false,
                    order: DEFAULT_VALUES.CONTACT_STATUS[(data.result.status).toUpperCase()].order
                };
                service.contacts.push(contact);
            });

        return service.contacts;
    };

    var updateContact = function (contact) {

        var contactServiceURL = '/contacts/' + contact.id + '.json';

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
                    showInfo: false,
                    order: DEFAULT_VALUES.CONTACT_STATUS[(data.result.status).toUpperCase()].order
                };

                replaceContact(contact);

            });

        return service.contacts;

    };

    var deleteContact = function (contactId) {

        var contactServiceURL = '/contacts/' + contactId + '.json';

        return $http.delete(contactServiceURL, {})
            .success(function (data) {

                for( var contactIndex = 0; contactIndex < service.contacts.length; contactIndex++){
                    var contact = service.contacts[contactIndex];
                    if(contact.id == contactId){
                        service.contacts.splice(contactIndex,1);
                        break;
                    }
                }
            });

        return service.contacts;
    };

    var updateContactStatus = function(contact, status){

        var contactServiceURL = '/contacts/' + contact.id + '.json';

        var tempContact = {
            user_id: contact.user_id,
            name: contact.name,
            email: contact.email,
            phone: contact.phone,
            description: contact.description,
            status: status
        };

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
                    showInfo: false,
                    order: DEFAULT_VALUES.CONTACT_STATUS[(data.result.status).toUpperCase()].order
                };

                replaceContact(contact);

            });

        return service.contacts;
    };

    var sendVideo = function (contactId, assetId) {

        var contactServiceURL = '/plans/send_video.json?contact_id=' + contactId + "&user_id=" + SessionService.$get().getId() + "&asset_id=" + assetId;

        return $http.post(contactServiceURL, {})
                .success(function (data) {
                    if(data.success){
                        var contact = {
                            id: data.result.contact.id,
                            user_id: data.result.contact.user_id,
                            name: data.result.contact.name,
                            email: data.result.contact.email,
                            phone: data.result.contact.phone,
                            description: data.result.contact.description,
                            status: data.result.contact.status,
                            showInfo: false,
                            order: DEFAULT_VALUES.CONTACT_STATUS[(data.result.contact.status).toUpperCase()].order
                        };

                        replaceContact(contact);
                    }
                });

        return service.contacts;

    };

    var watchVideo = function (token) {

        var contactServiceURL = '/plans/watch_video.json?token=' + token;

        return $http.post(contactServiceURL, {})
                .success(function (data) {
                    if(data.success){

                    }
                });
    };

    var videoEnded = function (assetId) {

        var contactServiceURL = '/plans/' + assetId + '/finish_video.json';

        return $http.get(contactServiceURL, {})
            .success(function (data) {
                if(data.success){
                }
            });
    };

    var gradeTest = function(answers, contactId, userId){

        answers.interest = JSON.parse(answers.interest);
        answers.contactTime = JSON.parse(answers.contactTime);
        userId = 1;
        var contactServiceURL = '/test_scores/grade_test.json';

        return $http.post(contactServiceURL, {
            user_id: userId,
            contact_id: contactId,
            test_code: DEFAULT_VALUES.TEST_CODES.PLAN,
            answers: [answers.interest, answers.contactTime]
        })
            .success(function (data) {
                if(data.success){
                }
            });
    };


    var service = {
        contacts: [],
        transitions: [],
        getContactList: getContactList,
        saveContact: saveContact,
        updateContact: updateContact,
        deleteContact: deleteContact,
        updateContactStatus: updateContactStatus,
        sendVideo: sendVideo,
        watchVideo: watchVideo,
        videoEnded: videoEnded,
        gradeTest: gradeTest
    };

    return service;

}]);