'use strict';

/**
 * @ngdoc overview
 * @name turnTimerApp
 * @description
 * # turnTimerApp
 *
 * Main module of the application.
 */
angular
  .module('turnTimerApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'timer'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
