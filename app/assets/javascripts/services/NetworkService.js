'use strict';

iuvare.factory('NetworkService', ['$http', '$q', "$state", 'SessionService', function($http, $q, $state, SessionService){

    var downlinesList = [];

    downlinesList = [
        { name: 'Diego Miramontes', image: '/assets/rails.png' },
        { name: 'Ricardo Rosas', image: '/assets/rails.png' },
        { name: 'Alberto Simonin', image: '' }
    ];

    var getAllDownlines = function () {
        return downlinesList;
    };

    return{
        getAllDownlines: getAllDownlines
    };

}]);