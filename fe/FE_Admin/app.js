var app = angular.module('myAppAdmin', ['ngRoute']);

app.config(function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
        .when('/homeAdmin', {
            templateUrl: 'app/views/homeAdmin.html',
            controller: 'HomeAdminController',
        })
        .when('/courseAdmin', {
            templateUrl: 'app/views/courseAdmin.html',
            controller: 'courseAdminController',
        })
        .when('/participationAdmin', {
            templateUrl: 'app/views/participationAdmin.html',
            controller: 'participationAdminController',
        })
        .otherwise({
            redirectTo: '/homeAdmin',
        });
});
