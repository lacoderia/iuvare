'use strict';

iuvare.factory('TestService', ['$http', '$q', "$state", 'SessionService', 'DEFAULT_VALUES', function($http, $q, $state, SessionService, DEFAULT_VALUES){

    var service = {
        getTestByCode: getTestByCode,
        getTestResultByCode: getTestResultByCode
    };
    return service;

    // Function that retrieves test questions and answers by code
    function getTestByCode(code) {

        var testsServiceURL = 'tests/by_code.json?code=' + code;

        return $http.get(testsServiceURL);
    };

    // Function that retrieves a test result by code
    function getTestResultByCode(code) {

        var testsServiceURL = 'tests/by_user.json?user_id=' + SessionService.$get().getId();;

        return $http.get(testsServiceURL);
    };

}]);