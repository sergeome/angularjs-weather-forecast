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

    var _selected;

    $scope.city = forecastService.city;

    $scope.getPredictions = function (value) {
        var url = 'https://autocomplete.wunderground.com/aq?query=' + value;
        var trustedUrl = $sce.trustAsResourceUrl(url);
        return $http.jsonp(trustedUrl, {
            jsonpCallbackParam: 'cb'
        })
        .then(function(rawResponse){
            var formattedResponse = [];
            for (var i = 0; i < rawResponse.data.RESULTS.length; i++) {
                formattedResponse.push(rawResponse.data.RESULTS[i].name);
            }
            return formattedResponse;
        });
    };

    $scope.ngModelOptionsSelected = function(value) {
        if (arguments.length) {
            _selected = value;
        } else {
            return _selected;
        }
    };

    $scope.modelOptions = {
        debounce: {
            default: 500,
            blur: 250
        },
        getterSetter: true
    };

    $scope.$watch('city', function () {
        forecastService.city = $scope.city;
    })
}]);


forecastApp.controller('forecastController', ['$scope', '$http', '$log', 'forecastService', function ($scope, $http, $log, forecastService) {
    $scope.city = forecastService.city;
    $scope.forecast = [];
    $scope.noForecast = false;

    $http.get('https://api.wunderground.com/api/e9e33b0743f634ec/forecast/q/' + $scope.city + '.json')
        .then(function (response) {
            if (!response.data.forecast) {
                $scope.noForecast = true;
            } else {
                $scope.noForecast = false;
                $scope.forecast = response.data.forecast.simpleforecast.forecastday;
            }
        });
}]);

