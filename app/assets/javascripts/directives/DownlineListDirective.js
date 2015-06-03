'use strict';

iuvareDirectives.directive('ngDownlineList', ['$rootScope', '$timeout', function($rootScope, $timeout){

    return{
        restrict: 'E',
        replace: true,
        template:   '<div class="network-list" ng-show="isEditingCycle()">' +
                        '<div class="network-list-header" ng-show="!isEmptyNetwork()">' +
                            '<span class="icon-circle-with-cross close-icon" title="Cerrar lista" ng-click="hideDownlineList()"></span>' +
                            '<input type="text" ng-model="query"><span class="input-icon icon-search"></span>' +
                        '</div>' +
                        '<div class="network-list-table">' +
                            '<table ng-show="!isEmptyNetwork()">' +
                                '<tbody>' +
                                    '<tr ng-repeat="downline in network | filter:query | orderBy:[\'getFirstName()\', \'getLastName()\']" ng-if="isValidDownline(downline)" ng-click="selectDownline(downline, downlinePosition)">' +
                                        '<td class="downline-image">' +
                                            '<span class="user-image">' +
                                            '<span class="icon-user" ng-if="!downline.getPicture()"></span>' +
                                                '<div class="image-container"><img ng-src="{{ downline.getPicture() }}" alt="{{ downline.getFirstName() }}" ng-if="downline.getPicture()"></div>' +
                                            '</span>' +
                                        '</td>' +
                                        '<td class="downline-name">{{ downline.getFirstName() }} {{ downline.getLastName() }}</td>' +
                                    '</tr>' +
                                '</tbody>' +
                            '</table>' +
                            '<div class="no-network-downlines" ng-show="isEmptyNetwork()">No tienes más socios registrados.</div>'+
                        '</div>' +
                    '</div>',
        scope: {
            network: '=',
            currentUser: '=',
            selectDownline: '=',
            downlinePosition: '=',
            showDownlineList: '='
        },
        link: function(scope, element, attrs){

            scope._network = [];
            scope.editCycle = false;

            scope.$on('hideAllDownlineLists', function () {
                scope.hideDownlineList();
            });

            scope.isValidDownline = function(downline){
                return !downline.isCycleMember(scope.currentUser.getId());
            };

            scope.isEmptyNetwork = function () {
                var networkLength = 0;
                angular.forEach(scope.network, function (item,key) {
                    if(!item.isCycleMember(scope.currentUser.getId())){
                        networkLength++;
                    }
                });

                return (networkLength < 1);
            };

            scope.showDownlineList = function(){
                $timeout(function () {
                    scope.editCycle = true;
                },0);
            };

            scope.hideDownlineList = function () {
                scope.editCycle = false;
            };

            scope.isEditingCycle = function(){
                return scope.editCycle;
            };

            scope.initDirective = function(){

            };

            scope.initDirective();


        }
    }

}]);