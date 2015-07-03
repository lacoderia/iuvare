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
        "color": "#515151",
        "labelPosition": "center",
        "neckHeight": "0%",
        "neckWidth": "0%",
        "colors": [
            DEFAULT_VALUES.CONTACT_STATUS_COLORS[1],
            DEFAULT_VALUES.CONTACT_STATUS_COLORS[2],
            DEFAULT_VALUES.CONTACT_STATUS_COLORS[3],
            DEFAULT_VALUES.CONTACT_STATUS_COLORS[4],
            DEFAULT_VALUES.CONTACT_STATUS_COLORS[5]
        ],
        "marginLeft": 15,
        "marginRight": 15,
        "titleField": "title",
        "valueField": "value",
        "pullDistance": 0,
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
        ProgressService.getProgress()
            .success(function(data){
                if(data.success){
                    funnelOptions.dataProvider = ProgressService.funnelData;

                    var chart = AmCharts.makeChart('chartdiv', funnelOptions, 1000);
                    chart.addListener('rendered', function(){
                        $('.amcharts-chart-div').find('a').hide();
                    });
                }
            })
            .error(function(error){
                $scope.showAlert('Ocurrió un error al asignar el socio.', 'danger');
                console.log('Ocurrió un error al asignar el socio.');
            });
    };

    $scope.initController();
}]);
