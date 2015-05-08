'use strict';

iuvare.factory('CollageService', ['$http', '$q', "$state", 'SessionService', 'DEFAULT_VALUES', function($http, $q, $state, SessionService, DEFAULT_VALUES){

    var service = {
        goals: [],
        getGoals: getGoals,
        saveGoal: saveGoal,
        updateGoal: updateGoal

    };
    return service;

    function getGoals() {

        var goalsServiceURL = '/goals/by_user.json?user_id=' + SessionService.$get().getId();

        return $http.get(goalsServiceURL, {})
            .success(function(data){
                if(data.success){
                    service.goals = data.result.goals;

                    angular.forEach(service.goals, function(goal){
                        goal.showInfo = false;

                        angular.forEach(DEFAULT_VALUES.GOAL_TYPES, function(goalType){
                            if(goal.goal_type == goalType.code) {
                                goal.type = goalType;
                            }
                        });
                    });

                }
                return 'TEXTO DE SUCCESS';
            });
    };

    function saveGoal(goal) {

        var goalsServiceURL = '/goals.json';

        return $http.post(goalsServiceURL, {
                goal: goal
            });
    };

    function updateGoal(id, goal) {

        var goalsServiceURL = '/goals/' + id + '.json';

        return $http.put(goalsServiceURL, {
                goal: goal
            });
    };

}]);