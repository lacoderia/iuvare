'use strict';

iuvare.controller('ListController', ["$scope", "$log", "$rootScope", "$modal", "AssetService", "AuthService", "InvitationService", "ListService", "SessionService", "DEFAULT_VALUES", function($scope, $log, $rootScope, $modal, AssetService, AuthService, InvitationService, ListService, SessionService, DEFAULT_VALUES){

    //Private variables
    var ASSET_TYPE = DEFAULT_VALUES.ASSETS.TYPES.PLAN;
    var addingContact = false;
    var editingContact = false;
    var audioGuideVisible = false;
    var audioCloseGuideVisible = false;

    //Public variables
    $scope.pageLoaded = false;

    $scope.CONTACT_STATUS = DEFAULT_VALUES.CONTACT_STATUS;
    $scope.CONTACT_STATUS_COLORS = DEFAULT_VALUES.CONTACT_STATUS_COLORS;
    $scope.AUDIO_GUIDES = {
        CALL: {source: DEFAULT_VALUES.ASSETS.PATH + 'audio_Jorge_Arzamendi_Como_prospectar.mp3'},
        CLOSE: {source: DEFAULT_VALUES.ASSETS.PATH + 'audio_Circe_Rodriguez_Proceso_de_cierre.mp3'}
    };
    $scope.contactList = [];
    $scope.selectedContact = undefined;
    $scope.contactQuery = undefined;
    $scope.inviteOptionsDropdown = [
        {text: 'Por teléfono, invitarlo a ver el plan en vivo', code: 'call', click: 'setInvitationOption(0)'},
        {text: 'Por internet, enviarle el video del plan por mail', code: 'online', click: 'setInvitationOption(1)'}
    ];
    $scope.plans = [];
    $scope.planDropdown = [];
    $scope.selectedPlan = undefined;

    // Object that holds the new contact values
    $scope.newContact = {
        name: undefined,
        email: '',
        phone: undefined,
        description: undefined
    };

    var originalNewContact = angular.copy($scope.newContact);

    $scope.filter = {
        to_invite: false,
        contacted: false,
        to_close: false,
        to_register: false,
        registered: false
    };

    $scope.filterByContactStatus = function (contact) {
        return $scope.filter[$scope.getContactStatus(contact.status).code] || noFilter($scope.filter);
    };

    function noFilter(filterObj) {
        for (var key in filterObj) {
            if (filterObj[key]) {
                // There is at least one checkbox checked
                return false;
            }
        }

        // No checkbox was found to be checked
        return true;
    }

    $scope.sortByContactStatus = function(contact) {
        return $scope.getContactStatus(contact.status).order;
    };

    // Method that toggles a goal's information form
    $scope.toggleContactInfo = function(contactItem){

        angular.forEach($scope.contactList, function(contact){
            if(contact.id != contactItem.id){
                contact.showInfo = false;
            }
        });

        (contactItem.showInfo)? contactItem.showInfo = false : contactItem.showInfo = true;

    };

    $scope.isContactListEmpty = function () {
        return ($scope.contactList.length)? false : true;
    };

    $scope.isAddingContact = function () {
        return addingContact;
    };

    $scope.isEditingContact = function () {
        return editingContact;
    };

    $scope.isSelectedContact = function(){
        return ($scope.selectedContact)? true: false;
    };

    $scope.isAudioGuideVisible = function(){
        return audioGuideVisible;
    };

    $scope.showAudioGuide = function(){
        audioGuideVisible = true;
    };

    $scope.isAudioCloseGuideVisible = function(){
        return audioCloseGuideVisible;
    };

    $scope.showAudioCloseGuide = function(){
        audioCloseGuideVisible = true;
    };

    // Method that resets the invitation form
    $scope.resetContactForm = function(){
        $scope.newContact = angular.copy(originalNewContact);
        $scope.newContactForm.$setPristine();
        $scope.newContactForm.$setUntouched();
    };

    $scope.createContact = function () {
        $scope.resetContactForm();
        addingContact = true;
    };

    $scope.editContact = function (contact) {
        editingContact = true;
        $scope.selectContact(angular.copy(contact));
    };

    $scope.refreshContacts = function () {
        $scope.contactList = angular.copy(ListService.contacts);

        if($scope.isSelectedContact()){
            for(var i=0; i < $scope.contactList.length; i++){
                if($scope.contactList[i].id == $scope.selectedContact.id){
                    $scope.selectContact($scope.contactList[i]);
                }
            }
        }

        addingContact = false;
        editingContact = false;
        audioGuideVisible = false;
        audioCloseGuideVisible = false;
        $scope.selectedPlan = undefined;
        $scope.selectedInvitationOption = undefined;
    };

    $scope.saveContact = function () {
        if($scope.newContactForm.$valid) {
            $scope.startSpin('container-spinner');

            ListService.saveContact($scope.newContact)
                .success(function(data){
                    if(data.success){
                        $scope.contactList = angular.copy(ListService.contacts);
                    }
                })
                .error(function (error, status) {
                    $scope.showAlert('Ocurrió un error al guardar el contacto. Intenta nuevamente.', 'danger', false);
                    console.log('Ocurrió un error al guardar el contacto.');
                })
                .finally(function () {
                    $scope.showContactListView();
                    $scope.stopSpin('container-spinner');
                });
        }
    };

    $scope.updateContact = function () {
        if($scope.editContactForm.$valid) {
            $scope.startSpin('container-spinner');

            ListService.updateContact($scope.selectedContact)
                .success(function(data){
                    if(data.success){
                        $scope.contactList = angular.copy(ListService.contacts);
                    }

                })
                .error(function (error, status) {
                    $scope.showAlert('Ocurrió un error al actualizar el contacto. Intenta nuevamente.', 'danger', false);
                    console.log('Ocurrió un error al actualizar el contacto.');
                })
                .finally(function () {
                    $scope.showContactListView();
                    $scope.stopSpin('container-spinner');
                });
        }
    };

    $scope.deleteContact = function (contactId) {
        $scope.startSpin('contact-spinner-' + contactId);

        ListService.deleteContact(contactId)
            .success(function (data) {
                $scope.contactList = angular.copy(ListService.contacts);
            })
            .error(function (error, status) {
                $scope.showAlert('Ocurrió un error al eliminar el contacto. Intenta nuevamente.', 'danger', false);
                console.log('Ocurrió un error al eliminar el contacto.');
            })
            .finally(function(){
                $scope.stopSpin('contact-spinner-' + contactId);
            });
    };

    $scope.getContactStatus = function (key) {
        return $scope.CONTACT_STATUS[key.toUpperCase()];
    };

    $scope.setInvitationOption = function(selectedOptionIndex){
        $scope.selectedInvitationOption = $scope.inviteOptionsDropdown[selectedOptionIndex];
    };

    $scope.setVideo = function (index) {
        $scope.selectedPlan = $scope.plans[index];
    };

    $scope.sendVideo = function (contact) {
        if($scope.selectedPlan){
            $scope.startSpin('contact-spinner-' + contact.id);

            ListService.sendVideo(contact.id, $scope.selectedPlan.id)
                .success(function (data) {
                    $scope.refreshContacts();
                    $scope.stopSpin('contact-spinner-' + contact.id);
                    $scope.showAlert('El mail con el enlace al plan ha sido enviado a tu correo. Asegúrate de reenviárselo a tu prospecto.', 'success', false);
                })
                .error(function (error, status) {
                    $scope.showAlert('Ocurrió un error al enviar el video. Intenta nuevamente.', 'danger', false);
                    console.log('Ocurrió un error al enviar el video');
                });
        }
    };

    $scope.selectContact = function(contact){
        $scope.selectedContact = contact;
    };

    $scope.$on('modal.hide', function(){
        $scope.stopSpin('contact-spinner-' + $scope.selectedContact.id);
    });

    $scope.completeStep = function(contact, status){
        $scope.startSpin('contact-spinner-' + contact.id);

        if (status == $scope.CONTACT_STATUS.REGISTERED.code) {

            if (contact.email) {
                var invitation = {
                    user_id: SessionService.$get().getId(),
                    recipient_name: contact.name,
                    recipient_email: contact.email
                };

                InvitationService.sendInvitation(invitation)
                    .success(function(data){
                        if(data.success){
                            $scope.showAlert('Se envió un correo al socio con las instrucciones para ingresar.', 'success', false);

                            $scope.updateContactStatus(contact, status);
                        }
                    })
                    .error(function(error){
                        $scope.showAlert('Ocurrió un error al enviar el correo al socio con las instrucciones para ingresar. Intenta nuevamente.', 'danger', false);
                        console.log(error.error);
                        $scope.stopSpin('contact-spinner-' + contact.id);
                    });
            } else {
                $scope.stopSpin('contact-spinner-' + contact.id);

                $scope.requestEmailModal = $modal({
                    title: 'My Title',
                    content: 'My Content',
                    show: true,
                    templateUrl: 'modal/mail_request_modal.tpl.html',
                    backdrop: true,
                    scope: $scope,
                    placement: 'center'
                });
            }

        } else {
            $scope.updateContactStatus(contact, status);
        }

    };

    $scope.retryCompleteStep = function(contact, status){
        $scope.requestEmailModal.hide();

        $scope.startSpin('contact-spinner-' + contact.id);

        var invitation = {
            user_id: SessionService.$get().getId(),
            recipient_name: contact.name,
            recipient_email: contact.requestedEmail
        };

        InvitationService.sendInvitation(invitation)
            .success(function(data){
                if(data.success){
                    $scope.showAlert('Se envió un correo al socio con las instrucciones para ingresar.', 'success', false);

                    $scope.updateContactStatus(contact, status);
                }
            })
            .error(function(error){
                $scope.showAlert('Ocurrió un error al enviar el correo al socio con las instrucciones para ingresar. Intenta nuevamente.', 'danger', false);
                console.log(error.error);
                $scope.stopSpin('contact-spinner-' + contact.id);
            });
    };

    $scope.updateContactStatus = function(contact, status) {
        ListService.updateContactStatus(contact, status)
            .success(function(data){
                if(data.success){
                    $scope.refreshContacts();
                }
            })
            .error(function (error, status) {
                $scope.showAlert('Ocurrió un error al actualizar el contacto. Intenta nuevamente.', 'danger', false);
                console.log('Ocurrió un error al actualizar el contacto.');
            })
            .finally(function () {
                $scope.stopSpin('contact-spinner-' + contact.id);
            });
    };

    $scope.showContactListView = function () {
        addingContact = false;
        editingContact = false;
        audioGuideVisible = false;
        audioCloseGuideVisible = false;
        $scope.selectedContact = undefined;
        $scope.selectedPlan = undefined;
        $scope.selectedInvitationOption = undefined;
    };

    $scope.showButton = function(contact, action){

        var showButton = true;

        switch (action){
            case 'send-video':
                showButton = (contact.status == DEFAULT_VALUES.CONTACT_STATUS.RULED_OUT.code || contact.status == DEFAULT_VALUES.CONTACT_STATUS.REGISTERED.code)? false : true;
                break;
            case 'close-workflow':
                showButton = (contact.status == DEFAULT_VALUES.CONTACT_STATUS.TO_CLOSE.code)? true : false;
                break;
        }

        return showButton;

    };


    // Method to init the controller's default state
    $scope.initController = function(){

        $scope.$emit('setCurrentSection');

        $scope.sectionTitle = $scope.currentSubsection.title;

        $scope.startSpin('container-spinner');

        ListService.getContactList()
            .success(function(data){
                if(data.success){
                    $scope.contactList = angular.copy(ListService.contacts);

                    AssetService.getAssetsByType(ASSET_TYPE)
                        .success(function (data) {
                            if(data.success){
                                angular.forEach(data.result.assets, function (video, index) {
                                    $scope.plans.push(video);
                                    $scope.planDropdown.push({
                                        text: video.title,
                                        click: 'setVideo(' + index + ')'
                                    });
                                });

                                $scope.stopSpin('container-spinner');
                                $scope.pageLoaded = true;
                            }
                        })
                        .error(function (error, status) {
                            $scope.showAlert('Ocurrió un error al obtener los contactos. Intenta nuevamente.', 'danger', false);
                            console.log('Ocurrió un error al obtener los planes.');
                        });

                }

            })
            .error(function (error, status) {
                $scope.showAlert('Ocurrió un error al obtener los contactos. Intenta nuevamente.', 'danger', false);
                console.log('Ocurrió un error al obtener los contactos.');
            });

    };

    $scope.initController();

}]);
