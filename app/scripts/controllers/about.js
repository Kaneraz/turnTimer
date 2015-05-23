'use strict';

/**
 * @ngdoc function
 * @name turnTimerApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the turnTimerApp
 */
angular.module('turnTimerApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
