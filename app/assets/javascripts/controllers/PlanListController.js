'use strict';

iuvare.controller('PlanListController', ["$scope", "$log", "$rootScope", "AssetService", "DEFAULT_VALUES", function($scope, $log, $rootScope, AssetService, DEFAULT_VALUES){

    // Private variables
    var ASSET_TYPE = 'plan';

    // Public variables
    $scope.ASSET_PATH = DEFAULT_VALUES.ASSET_PATHS.PLAN;
    $scope.planList = undefined;

    // Method that toggles plan's detail
    $scope.togglePlanInfo = function(planItem){
        angular.forEach($scope.planList, function(plan){
            if(planItem.id != plan.id){
                plan.showInfo = false;
            }else{
                if(plan.showInfo){
                    plan.showInfo = false;
                }else{
                    plan.showInfo = true;
                }
            }
        });
    };

    // Method to init the controller's default state
    $scope.initController = function(){
        $scope.$emit('setCurrentSection');

        $scope.sectionTitle = $scope.currentSubsection.title;

        AssetService.getAssetsByType(ASSET_TYPE)
            .success(function(data){
                if(data.success){
                    $scope.planList = AssetService.assets;
                }
            })
            .error(function(response){
                console.log('Hubo un error al obtener el plan.');
            });

    };

    $scope.initController();

}]);
