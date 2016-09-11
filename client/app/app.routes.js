angular.module('imageSharer')
    .config([
      '$stateProvider',
      '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider){
        $stateProvider
          .state('home', {
            url: '/home',
            templateUrl: 'app/components/home/homeView.html',
            controller: 'MainCtrl'
        })
        .state('images', {
            url: '/images/{username}',
            templateUrl: 'app/components/myImages/myImagesView.html',
            controller: 'MyImagesCtrl',
            resolve: {
              thisUser: ['$stateParams', 'user', function($stateParams, user){
                return user.getUser($stateParams.username);
              }]
            }
        })
          .state('profile',{
            url: '/user/{username}',
            templateUrl: 'app/components/profile/profileView.html',
            controller: 'ProfileCtrl',
            resolve: {
              thisUser: ['$stateParams', 'user', function($stateParams, user){
                return user.getUser($stateParams.username);
              }]
            }
          })
          .state('login',{
            url: '/login',
            templateUrl: '/app/components/login/loginView.html',
            controller: 'AuthCtrl',
            onEnter: ['$state', 'auth', function($state, auth){
              if(auth.isLoggedIn()){
                $state.go('home');
              }
            }]
          })
          .state('register', {
            url: '/register',
            templateUrl: '/app/components/register/registerView.html',
            controller: 'AuthCtrl',
            onEnter: ['$state', 'auth', function($state, auth){
              if(auth.isLoggedIn()){
                $state.go('home');
              }
            }]
          })
    
        $urlRouterProvider.otherwise('home');
    }]);