'use strict';

iuvare.factory('GoalService', ['$http', '$q', "$state", 'SessionService', 'DEFAULT_VALUES', function($http, $q, $state, SessionService, DEFAULT_VALUES){

    var goalsList = [];

    var getGoals = function () {

        goalsList = [];
        var goalsServiceURL = '/goals/by_user.json?user_id=' + SessionService.$get().getId();

        return $http.get(goalsServiceURL, {}).then(
            function(data){
                if(data.data.success){
                    var goalsList = data.data.result.goals;

                    angular.forEach(goalsList, function(goal){
                        goal.showInfo = false;

                        angular.forEach(DEFAULT_VALUES.GOAL_TYPES, function(goalType){
                           if(goal.goal_type == goalType.code) {
                               goal.type = goalType;
                           }
                        });
                    });

                }

                return goalsList;
            },
            function(response){
                console.log(response);
            }
        );
    };

    var saveGoal = function (goal) {

        var goalsServiceURL = '/goals.json';

        return $http.post(goalsServiceURL, {
            goal: goal
        }).then(
            function(data){
                return data;
            },
            function(response){
                console.log(response);
                return response.data.error;
            }
        );
    };

    var updateGoal = function (id, goal) {

        var goalsServiceURL = '/goals/' + id + '.json';

        return $http.put(goalsServiceURL, {
            goal: goal
        }).then(
            function(data){
                return data;
            },
            function(response){
                console.log(response);
                return response.data.error;
            }
        );
    };

    return{
        getGoals: getGoals,
        saveGoal: saveGoal,
        updateGoal: updateGoal
    };

}]);