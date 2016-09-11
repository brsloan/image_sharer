angular.module('imageSharer')
    .factory('user', ['$http', 'auth', function($http, auth){
       var user = {
           location: ''
       };
       
       user.getLocation = getLocation;
       user.setLocation = setLocation;
       user.getUser = getUser;
       user.saveProfileInfo = saveProfileInfo;
       
       return user;
       
       
       function getLocation(username, cb){
           $http.get('/' + username + '/location').success(function(data){
              user.location = data;
              cb(user.location);
           });
       }
       
       function setLocation(username, location){
           $http.put('/' + username + '/location/' + location, {}, {
               headers: {Authorization: 'Bearer ' + auth.getToken()}
           }).success(function(data){
               user.location = location;
           });
       }
        
        function getUser(username){
            return $http.get('/users/' + username).then(function(res){
                return res.data;
            });
        }
        
        function saveProfileInfo(user, callback){
            $http.put('/users/' + user.username + '/profile', JSON.stringify(user), {
                headers: {Authorization: 'Bearer ' + auth.getToken()}
            }).success(function(data){
                if(callback)callback(data);
            })
        }
        
    }]);