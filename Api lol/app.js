var app = angular.module("ApiLolApp", ['ngRoute','ApiLolController','ApiHSController','TestController']);



app.config(['$routeProvider', function ($routeprovider) {

    $routeprovider.when('/', {

            controller: "ApiLolController",
            templateUrl: "Home.html",
        }).when('/MatchHistory', {
            controller: "ApiLolController",
            templateUrl: "MatchHistory.html",

        }).when('/RankedStats', {
            controller: "ApiLolController",
            templateUrl: "RankedStats.html",
        }).when('/PerfilUsuario', {
            controller: "ApiLolController",
            templateUrl: "PerfilUsuario.html",
        }).when('/HearthStone', {
            controller: "ApiHSController",
            templateUrl: "HearthStone.html",
        }).when('/Test',{
        controller: "TestController",
        templateUrl: "Test.html",
    }).when('/Masteries',{
        controller :"ApiLolController",
        templateUrl:"Masteries.html",
    })
        .otherwise({
            redirectTo: '/',
        })
}]);


