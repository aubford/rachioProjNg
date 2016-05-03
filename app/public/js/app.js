var app = angular.module('appApp', ['ngRoute', 'ngAnimate'])

		app.run(function($rootScope, $location, $timeout) {
		$rootScope.$on('$viewContentLoaded', function() {
			$timeout(function() {
					componentHandler.upgradeAllRegistered();
			})
		})
		})

		app.config(function($routeProvider) {
			$routeProvider
				.when('/', {
					templateUrl: '../partials/index.html',
					controller: 'IndexController'
				})
				.otherwise({redirectTo : '/'})
		})
