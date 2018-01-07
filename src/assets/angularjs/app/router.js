// ROUTER

forecastApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

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
