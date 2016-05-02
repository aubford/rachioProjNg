var app = angular.module('appApp', ['ngRoute', 'ngAnimate', 'ngTouch', 'ui.bootstrap'])

		app.config(function($routeProvider) {
			$routeProvider
				.when('/', {
					templateUrl: '../partials/index.html',
					controller: 'IndexController'
				})
				.otherwise({redirectTo : '/'})
		})
