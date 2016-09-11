angular.module('imageSharer')
    .factory('image', ['$http', 'auth', function($http, auth){
        var o = {
            images: []
        };
        
        o.getAllImages = getAllImages;
        o.getUserImages = getUserImages;
        o.saveImage = saveImage;
        o.deleteImage = deleteImage;
        o.getImage = getImage;
        o.likeImage = likeImage;
        
        return o;
        
        function getAllImages(callback){
            $http.get('/images').success(function(images){
                angular.copy(images,o.images);
                if(callback)callback(images);
            });
        }
        
        function getUserImages(user, callback){
            $http.get('/images/user/' + user).success(function(images){
               angular.copy(images,o.images);
               if(callback)callback(images);
            });
        }
        
        function saveImage(image, callback){
            $http.put('/images', JSON.stringify(image), {
               headers: {Authorization: 'Bearer '+ auth.getToken()} 
            }).success(function(image){
                o.images.push(image);
                if(callback)callback(image);
            });
        }
        
        function deleteImage(image){
            $http.delete('/images/' + image._id, {
                headers: {Authorization: 'Bearer ' + auth.getToken()}
            }).success(function(id){
                var imageIndex = o.images.indexOf(image);
                if(imageIndex > -1)
                    o.images.splice(imageIndex, 1);
            });
        }
        
        function getImage(id){
            return $http.get('/images/' + id).then(function(res){
                return res.data;
            });
        }
        
        function likeImage(image){
            $http.put('/images/' + image._id + '/like', JSON.stringify(image), {
               headers: {Authorization: 'Bearer '+ auth.getToken()} 
            }).success(function(newImage){
                var imageIndex = o.images.indexOf(image);
                o.images[imageIndex].likers = newImage.likers;
            });
        }
        
    }])