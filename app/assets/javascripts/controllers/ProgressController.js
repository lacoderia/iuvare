/*
 *   ProfileController as profileCtrl
 *   Description: Controller for Profile section view
 * */

'use strict';

iuvare.controller('ProgressController', ["$scope", "$rootScope", "ProgressService", "DEFAULT_VALUES", function($scope, $rootScope, ProgressService, DEFAULT_VALUES){

    $scope.sectionTitle = undefined;

    var funnelOptions = {

        "type": "funnel",
        "balloonText": "[[title]]:<b>[[value]]</b>",
        "labelPosition": "right",
        "neckHeight": "0%",
        "neckWidth": "0%",
        "colors": [
            "#2E176E",
            "#580092",
            "#67369C",
            "#40498B",
            "#1E2E49"
        ],
        "marginLeft": 15,
        "marginRight": 160,
        "titleField": "title",
        "valueField": "value",
        "fontSize": 12,
        "allLabels": [],
        "balloon": {},
        "titles": [],
        "dataProvider": []
    };

    // Method to init the controller's default state
    $scope.initController = function(){
        $scope.$emit('setCurrentSection');

        $scope.sectionTitle = $scope.currentSubsection.title;
        funnelOptions.dataProvider = ProgressService.getProgress();

        var chart = AmCharts.makeChart('chartdiv', funnelOptions, 1000);
        chart.addListener('rendered', function(){
            $('.amcharts-chart-div').find('a').hide();
        });


    };

    $scope.initController();
}]);
