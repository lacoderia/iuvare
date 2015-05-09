'use strict';

iuvare.factory('CycleService', ['$http', '$q', "$state", 'UserService', 'DEFAULT_VALUES', function($http, $q, $state, UserService, DEFAULT_VALUES){

    var downlinesList = [];


    var resetDownlinesList = function(){
        downlinesList = [];
        for(var downlineIndex=0; downlineIndex<DEFAULT_VALUES.DOWNLINE_LENGTH_LIMIT; downlineIndex++){
            downlinesList.push({});
        }
    };

    var getDownlines = function(){

        resetDownlinesList();

        var downlinesCycleServiceURL = '/downlines/cycle.json';


        return $http.get(downlinesCycleServiceURL, {}).then(
            function(data){
                if(data.data.success){
                    var result = data.data.result;
                    angular.forEach(result, function(item, key){
                        var downline = UserService.createUser(item.id, item.first_name, item.last_name, item.email, item.xango_id, item.xango_rank, item.iuvare_id, item.sponsor_xango_id, item.sponsor_iuvare_id, item.placemente_xango_id, item.placemente_iuvare_id, item.active, item.downline_position, item.payment_expiration, item.picture, item.upline_id);
                        if(downline.getActive()){
                            downlinesList[downline.getDownlinePosition()-1] = downline;
                        }
                    });

                }
                return downlinesList;
            },
            function(response){
                console.log(response)
            }
        );
    };

    var attachDownline = function (downlineIndex,downlinePosition, downline) {
        console.log(downlinePosition)
        downlinesList[downlineIndex] = downline;
    }

    var detachDownline = function(downlineIndex){
        downlinesList[downlineIndex] = {};

    };

    var initService = function(){
        resetDownlinesList();
    };

    initService();

    return{
        getDownlines: getDownlines,
        attachDownline: attachDownline,
        detachDownline: detachDownline
    }

}]);