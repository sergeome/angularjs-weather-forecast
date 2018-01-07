import * as angular from 'angular';
import 'angular-messages';
import 'angular-resource';
import '@uirouter/angularjs';
import 'angular-ui-bootstrap';

export const ng1ForecastApp = angular.module('ng1ForecastApp', ['ui.router', 'ui.bootstrap']);

// ROUTER
ng1ForecastApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
  function ($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: './assets/angularjs/views/home.html'
    })
    .state('forecast', {
      url: '/forecast?city&unit',
      template: '<app-forecast></app-forecast>'
    });
    // Angular 1 Route
    // .state('forecast', {
    //   url: '/forecast?city&unit',
    //   templateUrl: './assets/angularjs/views/forecast.html'
    // });
}]);

ng1ForecastApp.service('weatherService', ['$http', '$sce', function ($http, $sce) {

  this.wasAutoDetected = false;

  this.getPredictions = function (inputValue) {
    const url = 'https://autocomplete.wunderground.com/aq?query=' + inputValue;
    const trustedUrl = $sce.trustAsResourceUrl(url);
    return $http.jsonp(trustedUrl, {
      jsonpCallbackParam: 'cb'
    });
  };

  this.getWeather = function (city) {
    return $http.get('https://api.wunderground.com/api/e9e33b0743f634ec/forecast/q/' + city + '.json');
  };

  this.getLocationBasedOnIpAddress = function () {
    return $http.get('https://api.wunderground.com/api/e9e33b0743f634ec/conditions/q/autoip.json')
      .then(function (rawData) {
        return rawData.data.current_observation.display_location.full;
      });
  };

}]);


// DIRECTIVES

ng1ForecastApp.directive('forecastItem', function () {
  return {
    templateUrl: './assets/angularjs/directives/forecast-item.html',
    replace: true,
    scope: {
      day: '@',
      monthNameShort: '@',
      weekday: '@',
      highFahrenheit: '@',
      lowFahrenheit: '@',
      highCelsius: '@',
      lowCelsius: '@',
      unit: '@'
    }
  };
});

// CONTROLLERS

ng1ForecastApp.controller('homeController', ['$scope', '$state', 'weatherService', function ($scope, $state, weatherService) {

  let _selected;
  $scope.showEmptyBoxAlert = false;

  // Location Autodetection Block
  if (!weatherService.wasAutoDetected) {
    const autoDetectedLocation = weatherService.getLocationBasedOnIpAddress();

    if (autoDetectedLocation) {
      autoDetectedLocation.then(function (data) {
        if (data) {
          $scope.city = data;
          weatherService.wasAutoDetected = true;
        }
      });
    }
  }
  // End Location Autodetection Block

  $scope.onSubmit = function () {
    $scope.showEmptyBoxAlert = !$scope.city;

    if ($scope.city) {
      $state.go('forecast', {
        city: $scope.city,
        unit: 'F'
      });
    }
  };

  $scope.getPredictions = function (inputValue) {

    return weatherService.getPredictions(inputValue)
      .then(function (rawResponse) {
        $scope.showEmptyBoxAlert = false;
        const formattedResponse = [];
        for (let i = 0; i < rawResponse.data.RESULTS.length; i++) {
          formattedResponse.push(rawResponse.data.RESULTS[i].name);
        }
        return formattedResponse;
      });
  };

  $scope.ngModelOptionsSelected = function (value) {
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

ng1ForecastApp.controller('forecastController',
  ['$scope', '$state', '$stateParams', 'weatherService',
  function ($scope, $state, $stateParams, weatherService) {
  $scope.forecast = [];
  $scope.noForecast = false;
  $scope.unit = 'F';

  if ($stateParams.city) {

    if ($stateParams.unit) {
      $scope.unit = $stateParams.unit;
    }

    $scope.city = $stateParams.city;

    weatherService.getWeather($scope.city)
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

  $scope.switchUnits = function (value) {
    $scope.unit = value;
    $state.go('forecast', {
      city: $scope.city,
      unit: value
    });
  };
}]);
