'use strict';

iuvare.factory('CycleService', [function(){

    var downlines = [];

    var getDownlines = function(){

        downlines = [];
        downlines.push({downLineId:0, name: 'Roberto Jiménez', image: '/assets/rails.png', currentCycle: { name: 'Ciclo 1', status: 'Completado'} })

        return downlines;

    };

    return{
        getDownlines: getDownlines
    }

}]);