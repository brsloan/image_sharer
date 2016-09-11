angular.module('imageSharer')
    .controller('ProfileCtrl', [
        '$scope',
        'user',
        'auth',
        'thisUser',
        function($scope, user, auth, thisUser){
            var formData = {};
            $scope.formData = formData;
            $scope.user = thisUser;
            $scope.saveInfo = saveInfo;
            $scope.canEdit = auth.isLoggedIn && (auth.currentUser() == thisUser.username);

            
            
            $scope.checkUser = function(user){
              return auth.isLoggedIn() && user != auth.currentUser();
            }
            
            
            function saveInfo(){
                $scope.saveSuccess = false;
                user.saveProfileInfo(thisUser, function(data){
                    $scope.saveSuccess = true;
                });
            }
        }
    ]);