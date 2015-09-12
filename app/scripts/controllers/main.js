'use strict';

/**
 * @ngdoc function
 * @name turnTimerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the turnTimerApp
 */
angular.module('turnTimerApp')
  .controller('MainCtrl', function ($scope) {
    $scope.players = [];

    var time = 0;
    $scope.selected = 0;

    var moveUp = function() {
      move(-1);
      $scope.$apply();
    };
    var moveDown = function() {
      move(1);
      $scope.$apply();
    };
		var swapUp = function() {swap(-1);};
		var swapDown = function() {swap(1);};

    $scope.bloody = function(index) {
	    $scope.players[index].bloodied = !$scope.players[index].bloodied;
    };

    $scope.remove = function(index) {
      $scope.players.splice(index, 1);
      if($scope.selected > $scope.players.length - 1) {
        $scope.selected = $scope.players.length - 1;
      }
    };

		var events = [
      { event: 'keydown:40', action: moveDown, description: 'Down arrow' },
      { event: 'keydown:38', action: moveUp, description: 'Up arrow' },
			{ event: 'keydown:37', action: swapUp, description: 'Left arrow' },
			{ event: 'keydown:39', action: swapDown, description: 'Right arrow' },
		];

    $scope.add = function() {
      var name = { name: $scope.addName, bloodied: false, totalTime: 0 };
      $scope.players.splice($scope.selected + 1, 0, name);
      $scope.addName = '';
      move(1);
    }; 

		events.forEach(function(currentValue) { 
			$scope.$on(currentValue.event, currentValue.action);
		});

		var swap = function(direction) {
			if(direction < 0 && $scope.selected === 0) {
				return;
			}
			if(direction > 0 && $scope.selected === $scope.players.length -1) {
				return;
			}
			var temp = $scope.players[$scope.selected];
			$scope.players[$scope.selected] = $scope.players[$scope.selected + direction];
			$scope.players[$scope.selected + direction] = temp;
			move(direction);
      $scope.$apply();
		};
    
    $scope.$on('timer-tick', function(e, args) {
      if($scope.players[$scope.selected] !== undefined) {
        time = args.millis;
      }
    });

    var move = function(direction) {
      $scope.players[$scope.selected].totalTime += Math.floor(time / 1000);
      $scope.selected = ($scope.selected + direction) % $scope.players.length;
      if($scope.selected < 0)
      {
				$scope.selected += $scope.players.length;
      }
      $scope.$broadcast('timer-start');
    };
  })
	.directive('keypressEvents', ['$document', '$rootScope', function($document, $rootScope) {
		return {
			restrict: 'A',
			link: function() {
        $document.bind('keydown', function(e) {
          $rootScope.$broadcast('keydown', e);
          $rootScope.$broadcast('keydown:' + e.which, e);
        });
        $document.bind('keypress', function(e) {
          $rootScope.$broadcast('keypress', e);
          $rootScope.$broadcast('keypress:' + e.which, e);
        });
      }
    };
}]);
