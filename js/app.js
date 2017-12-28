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
            url:'/forecast/:location',
            templateUrl: 'views/forecast.html'
        });
}]);

// CONTROLLERS

forecastApp.controller('homeController', ['$scope', '$http', '$log', '$sce', '$state', function ($scope, $http, $log, $sce, $state) {

    var _selected;
    $scope.showEmptyBoxAlert = false;

    $scope.validateInputBox = function () {
        $scope.showEmptyBoxAlert = !$scope.city;

        if ($scope.city) {
            $state.go('forecast', {'location': $scope.city})
        }
    };

    $scope.getPredictions = function (value) {
        var url = 'https://autocomplete.wunderground.com/aq?query=' + value;
        var trustedUrl = $sce.trustAsResourceUrl(url);
        return $http.jsonp(trustedUrl, {
            jsonpCallbackParam: 'cb'
        })
            .then(function(rawResponse){
                $scope.showEmptyBoxAlert = false;
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
}]);


forecastApp.controller('forecastController', ['$scope', '$http', '$log', '$stateParams', function ($scope, $http, $log, $stateParams) {
    $scope.forecast = [];
    $scope.noForecast = false;
    $scope.unit = 'F';

    if ($stateParams.location) {
        $scope.city = $stateParams.location;
        $http.get('https://api.wunderground.com/api/e9e33b0743f634ec/forecast/q/' + $stateParams.location + '.json')
            .then(function (response) {
                if (!response.data.forecast) {
                    $scope.noForecast = true;
                } else {
                    $scope.noForecast = false;
                    $scope.forecast = response.data.forecast.simpleforecast.forecastday;
                }
            });
    } else {
        $scope.noForecast = false;
    }
}]);

