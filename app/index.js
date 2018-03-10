var app = angular.module('app-module', [
  'ngRoute'
]);

app.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when("/", {
      templateUrl: "app/views/home.html"
    })
    .when("/search",{
      templateUrl: "app/views/search.html"
    })
    .when("/error",{
      templateUrl: "app/views/error.html"
    })
    .otherwise({
      redirectTo: "/error"
    });
}]);
