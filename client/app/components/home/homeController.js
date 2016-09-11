angular.module('imageSharer')
    .controller('MainCtrl', [
      '$scope',
      'auth',
      'image',
      '$timeout',
      function($scope, auth, image, $timeout){
        var formData = {};
        $scope.formData = formData;
        $scope.images = image.images;
        $scope.likeImage = likeImage;
        $scope.removeImage = removeImage;
        $scope.canEdit = canEdit;
        $scope.isLikedByThisUser = isLikedByThisUser;
        
        function likeImage(img){
          image.likeImage(img);
        }
        
        function removeImage(img){
            image.deleteImage(img);
        }
        
        function canEdit(img){
          return auth.isLoggedIn && (auth.currentUser() == img.user.username);
        }
        
        function isLikedByThisUser(img){
          return img.likers.find(function(liker){
            return liker == auth.currentUserId();
          });
        }
        
        image.getAllImages();
      }
    ])