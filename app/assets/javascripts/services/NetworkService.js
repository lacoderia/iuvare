'use strict';

iuvare.factory('NetworkService', ['$http', '$q', "$state", 'UserService', function($http, $q, $state, UserService){

    var downlinesList = [];

    var getAllDownlines = function () {

        var loginServiceURL = '/downlines/all.json';

       return $http.get(loginServiceURL, {}).then(
           function(data){
               if(data.data.success){
                   var result = data.data.result;
                   angular.forEach(result, function(item, key){
                       var downline = UserService.createUser(item.id, item.first_name, item.last_name, item.email, item.xango_id, item.xango_rank, item.iuvare_id, item.sponsor_xango_id, item.sponsor_iuvare_id, item.placemente_xango_id, item.placemente_iuvare_id, item.active, item.downline_position, item.payment_expiration, item.picture, item.upline_id);
                       if(downline.getActive()){
                           downlinesList.push(downline);
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

    return{
        getAllDownlines: getAllDownlines
    };

}]);