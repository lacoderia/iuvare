'use strict';

iuvare.factory('CollageService', ['$http', '$q', "$state", 'SessionService', 'DEFAULT_VALUES', function($http, $q, $state, SessionService, DEFAULT_VALUES){

    var service = {
        bricks: [],
        getCollage: getCollage,
        savePicture: savePicture,
        deletePicture: deletePicture

    };
    return service;

    function getCollage() {
        var collageServiceURL = '/collages/by_user.json?user_id=' + SessionService.$get().getId();

        return $http.get(collageServiceURL, {})
            .success(function(data){
                if(data.success && data.success.result && data.success.result.collages.length){
                    service.bricks = [];

                    var collage_pictures = data.result.collages[0].collage_images;
                    angular.forEach(collage_pictures, function(collage_picture){
                        var brick = {
                            'id': collage_picture.id,
                            'src': collage_picture.picture,
                            'uploading': false,
                            'order': collage_picture.order
                        };

                        service.bricks.push(brick);
                    });
                }
            });
    };

    function savePicture(picture) {

        var collageServiceURL = '/collage_images/create_by_user_id.json';

        return $http.post(collageServiceURL, {
            user_id: SessionService.$get().getId(),
            picture: picture.src,
            order: picture.order
            });
    };

    function deletePicture(picture) {

        var collageServiceURL = '/collage_images/' + picture.id + '.json';

        return $http.delete(collageServiceURL);
    };

}]);