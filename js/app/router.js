// ROUTER

forecastApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
            url:'/',
            templateUrl: 'views/home.html'
        })
        .state('forecast', {
            url:'/forecast?city&unit',
            templateUrl: 'views/forecast.html'
        });
}]);
