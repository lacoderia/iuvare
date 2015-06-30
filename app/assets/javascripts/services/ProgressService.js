'use strict';

iuvare.factory('ProgressService', ['$http', '$q', 'DEFAULT_VALUES', function($http, $q, DEFAULT_VALUES){

    var progress = [
        { title: 'Prospectos', total: 20 },
        { title: 'Invitados', total: 30 },
        { title: 'Ya vieron el plan', total: 40 },
        { title: 'Por inscribir', total: 20 },
        { title: 'Inscritos', total: 10 }
    ];

    var funnelData = [];

    var getProgress = function(){
        var total = 0;

        angular.forEach(progress, function(progressItem){
            var funnelItem = {
                title: (progressItem.title).toUpperCase(),
                value: progressItem.total
            };

            funnelData.push(funnelItem);
        });

        return funnelData;
    };


    var service = {
        funnelData: funnelData,
        getProgress: getProgress
    };

    return service;

}]);