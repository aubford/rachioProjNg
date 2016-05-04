var app = angular.module('appApp', ['ngRoute', 'ngAnimate', 'ngMaterial', 'ngAria', 'ngMessages'])


		app.config(function($routeProvider, $mdThemingProvider) {
			$routeProvider
				.when('/', {
					templateUrl: '../partials/index.html',
					controller: 'IndexController'
				})
				.otherwise({redirectTo : '/'});

			$mdThemingProvider
				.theme('default')
				.primaryPalette('cyan')
				.accentPalette('lime')
		})
