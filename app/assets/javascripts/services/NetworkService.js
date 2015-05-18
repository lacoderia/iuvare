'use strict';

iuvare.factory('NetworkService', ['$http', '$q', "$state", 'UserService', 'DEFAULT_VALUES', function($http, $q, $state, UserService, DEFAULT_VALUES){

    var service = {
        downlinesList: [],
        downlinesNetworkList: [],
        getAllDownlines: getAllDownlines,
        attachDownline: attachDownline,
        detachDownline: detachDownline
    };
    return service;

    function resetDownlinesList(){
        service.downlinesList = [];
        for(var downlineIndex=0; downlineIndex<DEFAULT_VALUES.DOWNLINE_LENGTH_LIMIT; downlineIndex++){
            service.downlinesList.push({});
        }
    }

    function updateDownlinesList(){
        resetDownlinesList();

        angular.forEach(service.downlinesNetworkList, function(downline){
           if(downline.getDownlinePosition()){
               service.downlinesList[downline.getDownlinePosition()-1] = downline;
           }
        });
    }

    function getAllDownlines() {

        service.downlinesNetworkList = [];
        var downlinesServiceURL = '/downlines/all.json';

        return $http.get(downlinesServiceURL, {})
            .success(function(data){
                if(data.success){
                    var result = data.result;
                    angular.forEach(result, function(item, key){
                        var downline = UserService.createUser(item.id, item.first_name, item.last_name, item.email, item.xango_id, item.xango_rank, item.iuvare_id, item.sponsor_xango_id, item.sponsor_iuvare_id, item.placement_xango_id, item.placement_iuvare_id, item.active, item.downline_position, item.payment_expiration, item.picture, item.upline_id, item.test_scores, item.downline_count);
                        if(downline.getActive()){
                            service.downlinesNetworkList.push(downline);
                        }
                    });

                    updateDownlinesList()
                }
            })
            .error(function(response){
                console.log(response)
            });
    }

    function attachDownline(downline, downlinePosition) {

        var downlinesServiceURL = '/downlines/' + downline.getId() + '/change_position.json';

        return $http.post(downlinesServiceURL, {
            position: downlinePosition
        })
            .success(function(data){
                if(data.success){
                    angular.forEach(service.downlinesNetworkList, function(item){
                        if(item.getId() == downline.getId()){
                            downline.setDownlinePosition(downlinePosition);
                        } else {
                            if(item.getDownlinePosition() == downlinePosition){
                                item.setDownlinePosition(undefined);
                            }
                        }
                    });

                    updateDownlinesList()
                }
            })
            .error(function(response){
                console.log(response);
            });
    }

    function detachDownline(downline){

        var downlinesServiceURL = '/downlines/' + downline.getId() + '/change_position.json';

        return $http.post(downlinesServiceURL, {
            position: null
        })
            .success(function(data){
                if(data.success){
                    angular.forEach(service.downlinesNetworkList, function(item){
                        if(item.getId() == downline.getId()){
                            downline.setDownlinePosition(undefined);
                        }
                    });

                    updateDownlinesList()
                }
            })
            .error(function(response){
                console.log(response);
            });
    };

}]);