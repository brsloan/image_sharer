angular.module('imageSharer')
    .controller('MyImagesCtrl', [
        '$scope',
        'auth',
        'image',
        'thisUser',
        function($scope, auth, image, thisUser){
            $scope.images = image.images;
            $scope.likeImage = likeImage;
            $scope.addImage = addImage;
            $scope.removeImage = removeImage;
            $scope.canEdit = auth.isLoggedIn && (auth.currentUser() == thisUser.username);
            $scope.isLikedByThisUser = isLikedByThisUser;
            $scope.thisUser = thisUser;
            
            function likeImage(img){
                image.likeImage(img);
            }
            

            function addImage(){
                image.saveImage({
                   url: $scope.imageUrl,
                   caption: $scope.imageCaption
                });
                $scope.imageUrl = '';
                $scope.imageCaption = '';
            }
            
            function removeImage(img){
                console.log('delete image');
                image.deleteImage(img);
            }
            
            function isLikedByThisUser(img){
                return img.likers.find(function(liker){
                    return liker == auth.currentUserId();
                });
            }
            
            image.getUserImages(thisUser.username);
        }
    ]);
    
