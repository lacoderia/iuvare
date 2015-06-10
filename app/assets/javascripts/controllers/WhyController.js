/*
 *   WhyController as whyCtrl
 *   Description: Controller for Goals section view
 * */

'use strict';

iuvare.controller('WhyController', ["$scope", "$rootScope", "AuthService", "GoalService", "SessionService", "DEFAULT_VALUES", function($scope, $rootScope, AuthService, GoalService, SessionService, DEFAULT_VALUES){

    $scope.GOAL_TYPES = DEFAULT_VALUES.GOAL_TYPES;
    $scope.GOAL_MODES = DEFAULT_VALUES.GOAL_MODES;

    // Array that holds the goal values
    $scope.goalTypeDropdown = [];

    // Array that holds the user's goals list
    $scope.goalsList = undefined;

    // Object that holds the goal values
    $scope.goal = {
        id: undefined,
        dream: undefined,
        goal: undefined,
        date: undefined,
        type: undefined
    };

    // Object that holds the reference to the currently selected goal
    $scope.selectedGoal = undefined;

    // Variables privadas
    $scope.showNewGoal = false;
    $scope.currentGoalMode = undefined;
    var originalGoal = angular.copy($scope.goal);

    // Method that shows the new goal form
    $scope.showGoalForm = function(mode){
        $scope.currentGoalMode = mode;
        $scope.showGoal = true;
        $scope.updateGoalsDropdown();
    };

    // Method that hides the new goal form
    $scope.hideGoalForm = function(){
        $scope.currentGoalMode = undefined;
        $scope.showGoal = false;
    };

    // Method that toggles a goal's information form
    $scope.toggleGoalInfo = function(goalItem){
        angular.forEach($scope.goalsList, function(goal){
            if(goalItem.goal_type != goal.goal_type){
                goal.showInfo = false;
            }else{
                if(goal.showInfo){
                    goal.showInfo = false;
                }else{
                    goal.showInfo = true;
                }
            }
        });

    };

    $scope.createGoal = function(goal){
        $scope.goal = angular.copy(originalGoal);
        $scope.selectedGoal = goal;
        $scope.showGoalForm($scope.GOAL_MODES.NEW);
    };

    $scope.editGoal = function(goal){
        $scope.goal = angular.copy(goal);
        $scope.selectedGoal = goal;
        $scope.showGoalForm($scope.GOAL_MODES.EDIT);
    };

    // Method that resets the goal form
    $scope.resetGoalForm = function(){
        $scope.goal = angular.copy(originalGoal);
        $scope.selectedGoal = undefined;
        $scope.goalForm.$setPristine();
        $scope.goalForm.$setUntouched();
    };

    // Method that updates the selectable goals dropdown list
    $scope.updateGoalsDropdown = function(){
        $scope.goalTypeDropdown = [];

        angular.forEach($scope.GOAL_TYPES, function (goalType, index) {

            var availableGoal = true;
            angular.forEach($scope.goalsList, function(goal) {
                if (goal.goal_type == goalType.code) {
                   availableGoal = false;
                }
            });

            if (availableGoal) {
                $scope.goalTypeDropdown.push({
                    text: goalType.name,
                    click: 'setGoalType(' + index + ')'
                });
            }

        });
    };

    // Method that sets the selected goal type on the dropdown
    $scope.setGoalType = function(index){
        if ($scope.goal) {
            $scope.goal.type = $scope.GOAL_TYPES[index];
            $scope.goal.goal_type = $scope.goal.type.code;
        }
    };

    // Method that filters calendar avilable dates
    $scope.onlyFutureDate = function (date) {
        var today = new Date();
        today.setDate(today.getDate() - 1);

        return date > today;
    };

    // Method that saves a new goal
    $scope.saveGoal = function(){
        if ($scope.goalForm.$valid && $scope.goal.type && $scope.goal.date) {

            $scope.startSpin('container-spinner');

            var goal = {
                user_id: SessionService.$get().getId(),
                dream: $scope.goal.dream,
                goal: $scope.goal.goal,
                date: $scope.goal.date,
                goal_type: $scope.goal.type.code
            };

            GoalService.saveGoal(goal)
                .success(function(data) {
                    if(data.success){
                        $scope.goal.id = data.result.id;
                        $scope.goal.showInfo = false;

                        $scope.goalsList.push($scope.goal);
                        $scope.resetGoalForm();
                        $scope.hideGoalForm();

                        $scope.stopSpin('container-spinner');
                    }
                })
                .error(function (error, status) {
                    console.log('Hubo un error al guardar la meta. ');
                });
        }
    };

    // Method that updates the original goal object
    $scope.updateOriginalGoal = function(goal){
        for(var i=0; i<$scope.goalsList.length; i++){
            if($scope.goalsList[i].id == goal.id){
                $scope.goalsList[i] = goal;
            }
        }
    };

    // Method that updates a goal
    $scope.updateGoal = function(){
        if ($scope.goalForm.$valid && $scope.goal.type && $scope.goal.date) {
            $scope.startSpin('container-spinner');

            var goal = {
                user_id: SessionService.$get().getId(),
                dream: $scope.goal.dream,
                goal: $scope.goal.goal,
                date: $scope.goal.date,
                goal_type: $scope.goal.type
            };

            GoalService.updateGoal($scope.goal.id, goal)
                .success(function(data){
                    if(data.success){
                        $scope.updateOriginalGoal($scope.goal);
                        $scope.resetGoalForm();
                        $scope.hideGoalForm();

                        $scope.stopSpin('container-spinner');
                    }
                })
                .error(function(error, status){
                    console.log('Hubo un error al actualizar la meta. ');
                });
        }
    };

    // Method that calls the current mode submit function
    $scope.callSubmitAction = function(action){
        switch(action){
            case 'new-goal':
                $scope.saveGoal();
                break;
            case 'edit-goal':
                $scope.updateGoal();
                break;
            default:
                break;
        }
    };

    // Method to init the controller's default state
    $scope.initController = function(){

        $scope.$emit('setCurrentSection');

        $scope.sectionTitle = $scope.currentSubsection.title;

        $scope.startSpin('container-spinner');

        // Obtenemos las metas del usuario
        GoalService.getGoals()
            .success(function(data){
                if(data.success){
                    $scope.goalsList = GoalService.goals;
                    $scope.stopSpin('container-spinner');
                }
            })
            .error(function (error, status) {
                console.log('Hubo un error al obtener las metas.');
            });

    };

    $scope.initController();
}]);
