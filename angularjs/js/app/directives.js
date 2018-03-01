// DIRECTIVES

forecastApp.directive('forecastItem', function () {
    return {
        templateUrl: 'directives/forecast-item.html',
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
    }
});

