/*
*   RootController as rootCtrl
*   Description: Includes variables and methods for manipulate the layout view
* */

'use strict';

iuvare.controller('RootController', ["$scope", "$rootScope", "$state", "$timeout", "$alert", "usSpinnerService", "AuthService", "EventService", "NavigationService", "SessionService", function($scope, $rootScope, $state, $timeout, $alert, usSpinnerService, AuthService, EventService, NavigationService, SessionService){

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

    $scope.showAlert = function(content, type){
        $alert({
            animation: 'am-fade-and-slide-top',
            container: 'body',
            content: content,
            dismissable: true,
            duration: 5,
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

    $scope.isPublicView = function(){
        return $state.current.authenticationRequired;
    };

    // Event popup

    $rootScope.$on('getMonthlyEvent' ,function(){
        EventService.getEvent()
            .success(function(data){
                if(data.success){

                    if (EventService.event) {
                        $('<img/>')
                            .attr("src", EventService.event.picture)
                            .load(function() {
                                $('.event-popup').attr('src', EventService.event.picture);

                                $(".event-popup").fancybox({
                                    'content': '<img src="' + EventService.event.picture + '" alt="" />',
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
