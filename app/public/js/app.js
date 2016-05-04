var app = angular.module('appApp', ['ngRoute', 'ngAnimate', 'ngMaterial'])


		app.config(function($routeProvider, $mdThemingProvider, $mdIconProvider) {
			$routeProvider
				.when('/', {
					templateUrl: '../partials/index.html',
					controller: 'IndexController'
				})
				.otherwise({redirectTo : '/'})

			$mdThemingProvider.theme('default')
				.primaryPalette('cyan')
				.accentPalette('lime')
		})
