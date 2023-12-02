var app = angular.module('myApp', ['ngRoute']);

app.config(function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
        .when('/home', {
            templateUrl: 'app/views/home.html',
            controller: 'HomeController',
        })
        .when('/roadmap', {
            templateUrl: 'app/views/roadmap.html',
            controller: 'RoadmapController',
        })
        .when('/blog', {
            templateUrl: 'app/views/blog.html',
            controller: 'BlogController',
        })
        .when('/home/course', {
            templateUrl: 'app/views/dk_courses.html',
            controller: 'Dk_CoursesController',
        })
        .when('/settings', {
            templateUrl: 'app/views/Account_Settings.html',
            controller: 'SettingController',
        })
        .otherwise({
            redirectTo: '/home',
        });
});
