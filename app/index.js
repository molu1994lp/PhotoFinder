/**
 * main application module
 */
var app = angular.module('app-module', [
  'ngRoute'
]);

/**
 * app.config - is specifing routes in application
 */
app.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when("/", {
      templateUrl: "app/views/home.html"
    })
    .when("/finded",{
      templateUrl: "app/views/finded.html"
    })
    .when("/error",{
      templateUrl: "app/views/error.html"
    })
    .otherwise({
      redirectTo: "/error"
    });
}]);
