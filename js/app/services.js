forecastApp.service('weatherService', ['$http', '$sce', function ($http, $sce) {

    this.getPredictions = function (inputValue) {
        var url = 'https://autocomplete.wunderground.com/aq?query=' + inputValue;
        var trustedUrl = $sce.trustAsResourceUrl(url);
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

