'use strict';

iuvare.factory('TestService', ['$http', '$q', "$state", 'SessionService', 'DEFAULT_VALUES', function($http, $q, $state, SessionService, DEFAULT_VALUES){

    var service = {
        getTestByCode: getTestByCode,
        getTestResultByCode: getTestResultByCode,
        gradeTest: gradeTest
    };
    return service;

    // Function that retrieves test questions and answers by code
    function getTestByCode(code) {

        var testsServiceURL = 'tests/by_code.json?code=' + code;

        return $http.get(testsServiceURL);
    };

    // Function that retrieves a test result by code
    function getTestResultByCode(code) {

        var testsServiceURL = 'tests/by_code_and_user.json';

        return $http.get(testsServiceURL, {
            user_id: SessionService.$get().getId(),
            test_code: code
        });
    };

    // Function that grades a test and returns the test results
    function gradeTest(code, answers) {

        var testsServiceURL = 'test_scores/grade_test.json';

        return $http.post(testsServiceURL, {
            user_id: SessionService.$get().getId(),
            test_code: code,
            answers: answers
        });
    };

}]);