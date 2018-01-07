// ROUTER

forecastApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    //$urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
            url:'/',
            templateUrl: './assets/angularjs/views/home.html'
        })
        .state('forecast', {
            url:'/forecast?city&unit',
            templateUrl: './assets/angularjs/views/forecast.html'
        });
}]);
