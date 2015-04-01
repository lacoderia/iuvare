'use strict';

iuvare.factory('CycleService', [function(){

    var downlines = [];

    var getDownlines = function(){

        downlines = [];
        downlines.push({downLineId:0, name: 'Roberto Jiménez', image: '/assets/rails.png', currentCycle: { number: 1, name: 'Ciclo 1', status: 1 }, cyclesDetails: [{ number: 1, 'name': 'Ciclo 1', status:1 },{ number: 2, 'name': 'Ciclo 2', status:1 },{ number: 3, 'name': 'Ciclo 3', status: 0 },{ number:4, 'name': 'Ciclo 4', status: 0 },{ number:5, 'name': 'Ciclo 5', status: 0 }] })

        return downlines;

    };

    return{
        getDownlines: getDownlines
    }

}]);