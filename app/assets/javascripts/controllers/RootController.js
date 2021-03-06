/*
*   RootController as rootCtrl
*   Description: Includes variables and methods for manipulate the layout view
* */

'use strict';

iuvare.controller('RootController', ["$scope", "$rootScope", "$state", "$timeout", "$alert", "$window", "usSpinnerService", "AuthService", "EventService", "NavigationService", "SessionService", "DEFAULT_VALUES", function($scope, $rootScope, $state, $timeout, $alert, $window, usSpinnerService, AuthService, EventService, NavigationService, SessionService, DEFAULT_VALUES){

    $rootScope.showUnauthorizedError = false;
    $scope.currentSection = undefined;
    $scope.currentSubsection = undefined;
    $scope.subsections = [];

    // Listeners del controlador
    $scope.$on('setCurrentSection', function($event){

        var sectionCode = $state.current.section;
        var subsectionCode = $state.current.subsection;

        $scope.currentSection = NavigationService.getSectionByCode(sectionCode);
        $scope.subsections = $scope.currentSection.subsections;
        $scope.currentSubsection = NavigationService.getSubsectionByCode($scope.subsections,subsectionCode);

    });

    $scope.logout = function(){
        AuthService.logout();
    };

    $rootScope.alert = undefined;
    $scope.showAlert = function(content, type, duration){
        if (duration === undefined) duration = 7;

        if ($rootScope.alert) {
            $rootScope.alert.hide();
        }

        $rootScope.alert = $alert({
            animation: 'am-fade-and-slide-top',
            container: 'body',
            content: content,
            dismissable: true,
            duration: duration,
            placement: 'top-right',
            show: true,
            type: type
        });
    };

    $scope.startSpin = function(spinner){
        $timeout(function(){
            usSpinnerService.spin(spinner);
        }, 0);
    };

    $scope.stopSpin = function(spinner){
        $timeout(function(){
            usSpinnerService.stop(spinner);
        }, 0);
    };

    $rootScope.scrollToTop = function(){
        $window.scrollTo(0,0);
    };

    $rootScope.openEventPopUp = function(event){
        $('<img/>')
            .attr("src", event.picture)
            .load(function() {
                $('.event-popup').attr('src', event.picture);

                $(".event-popup").fancybox({
                    'content': '<img src="' + event.picture + '" alt="" />',
                    'showCloseButton': true
                }).trigger('click');
            })
            .error(function() {
            });
    };

    $scope.isPublicView = function(){
        return $state.current.authenticationRequired;
    };

    // Event popup

    $rootScope.$on('getMonthlyEvent' ,function(){
        EventService.getEvent(DEFAULT_VALUES.ASSETS.TYPES.SEMINAR)
            .success(function(data){
                if(data.success){
                    var event = angular.copy(EventService.event);

                    if (event) {
                        $('<img/>')
                            .attr("src", event.picture)
                            .load(function() {
                                $('.event-popup').attr('src', event.picture);

                                $(".event-popup").fancybox({
                                    'content': '<img src="' + event.picture + '" alt="" />',
                                    'showCloseButton': true
                                }).trigger('click');
                            })
                            .error(function() {
                            });
                    }

                }
            })
            .error(function(){
                console.log('Ocurrió un error al obtener el evento del mes.') ;
            });
    });

    var initController = function(){

    };

    initController();

}]);
