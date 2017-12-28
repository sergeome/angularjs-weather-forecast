var forecastApp = angular.module('forecastApp', ['ui.router', 'ui.bootstrap']);

// ROUTER

forecastApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
            url:'/',
            templateUrl: 'views/home.html'
        })
        .state('forecast', {
            url:'/forecast',
            templateUrl: 'views/forecast.html'
        });
}]);

// SERVICES

forecastApp.service('forecastService', function () {
    this.city = '';
});

// CONTROLLERS

forecastApp.controller('homeController', ['$scope', '$http', '$log', '$sce', 'forecastService', function ($scope, $http, $log, $sce, forecastService) {
    $scope.city = forecastService.city;

    $scope.getPredictions = function (value) {
        var url = 'http://autocomplete.wunderground.com/aq?query=' + value;
        var trustedUrl = $sce.trustAsResourceUrl(url);
        $http.jsonp(trustedUrl, {
            jsonpCallbackParam: 'cb'
        })
        .then(function(response){
            $log.info(response.data.RESULTS[0].name);
            return response.data.RESULTS[0].name;
        });
    };

    $scope.$watch('city', function () {
        forecastService.city = $scope.city;
    })
}]);


forecastApp.controller('forecastController', ['$scope', '$http', '$log', 'forecastService', function ($scope, $http, $log, forecastService) {
    $scope.city = forecastService.city;
    $scope.forecast = [];

    $http.get('https://api.wunderground.com/api/e9e33b0743f634ec/forecast/q/' + $scope.city + '.json')
        .then(function (response) {
            $scope.forecast = response.data.forecast.simpleforecast.forecastday;
        }, function (error) {

        });
}]);

