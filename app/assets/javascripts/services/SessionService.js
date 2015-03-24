'use strict';

iuvare.factory('SessionService', [function(){

    var session = {
        id: undefined,
        firstName: undefined,
        lastName: undefined,
        email: undefined,
        xangoId: undefined,
        iuvareId: undefined,
        sponsorXangoId: undefined,
        sponsorIuvareId: undefined,
        placementXangoId: undefined,
        placementIuvareId: undefined
    };

    var createSession = function (id, firstName, lastName, email, xangoId, iuvareId, sponsorXangoId, sponsorIuvareId, placementeXangoId, placementeIuvareId) {
        this.setId(id);
        this.setFirstName(firstName);
        this.setLastName(lastName);
        this.setEmail(email);
        this.setXangoId(xangoId);
        this.setIuvareId(iuvareId);
        this.setSponsorXangoId(sponsorXangoId)
        this.setSponsorIuvareId(sponsorIuvareId);
        this.setPlacementXangoId(placementeXangoId)
        this.setPlacementIuvareId(placementeIuvareId);
    };

    var getId = function(){
        return session.id;
    };

    var setId = function(id){
        session.firstName = id;
    };

    var getFirstName = function(){
        return session.firstName;
    };

    var setFirstName = function(firstName){
        session.firstName = firstName;
    };

    var getLastName = function(){
        return session.lastName;
    };

    var setLastName = function(lastName){
        session.lastName = lastName;
    };

    var getEmail = function(){
        return session.email;
    };

    var setEmail = function(email){
        session.email = email;
    };

    var getXangoId = function(){
        return session.xangoId;
    };

    var setXangoId = function(xangoId){
        session.xangoId = xangoId;
    };

    var getIuvareId = function(){
        return session.iuvareId;
    };

    var setIuvareId = function(iuvareId){
        session.iuvareId = iuvareId;
    };

    var getSponsorXangoId = function(){
        return session.sponsorXangoId;
    };

    var setSponsorXangoId = function(sponsorXangoId){
        session.sponsorXangoId = sponsorXangoId;
    };

    var getSponsorIuvareId = function(){
        return session.sponsorIuvareId;
    };

    var setSponsorIuvareId = function(sponsorIuvareId){
        session.sponsorIuvareId = sponsorIuvareId;
    };

    var getPlacementXangoId = function(){
        return session.placementXangoId;
    };

    var setPlacementXangoId = function(placementXangoId){
        session.placementXangoId = placementXangoId;
    };

    var getPlacementIuvareId = function(){
        return session.placementIuvareId;
    };

    var setPlacementIuvareId = function(placementIuvareId){
        session.placementIuvareId = placementIuvareId;
    };

    return{
        createSession: createSession,
        getId: getId,
        setId: setId,
        getFirstName: getFirstName,
        setFirstName: setFirstName,
        getLastName: getLastName,
        setLastName: setLastName,
        getEmail: getEmail,
        setEmail: setEmail,
        getXangoId: getXangoId,
        setXangoId: setXangoId,
        getIuvareId: getIuvareId,
        setIuvareId: setIuvareId,
        getSponsorXangoId: getSponsorXangoId,
        setSponsorXangoId: setSponsorXangoId,
        getSponsorIuvareId: getSponsorIuvareId,
        setSponsorIuvareId: setSponsorIuvareId,
        getPlacementXangoId: getPlacementXangoId,
        setPlacementXangoId: setPlacementXangoId,
        getPlacementIuvareId: getPlacementIuvareId,
        setPlacementIuvareId: setPlacementIuvareId
    };

}]);