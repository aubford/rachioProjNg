var app = angular.module('appApp', ['ngRoute', 'ngAnimate', 'ngMaterial', 'ngAria', 'ngMessages', 'ngCookies'])


		app.config(function($routeProvider, $mdThemingProvider) {
			$routeProvider
				.when('/', {
					templateUrl: '../partials/login.html',
					controller: 'LoginController',
					resolve: {
						check: function($location, $cookies){
							if($cookies.get('id')){
								$location.path('/manual')
							}
						}
					}
				})
				.when('/manual', {
					templateUrl: '../partials/index.html',
					controller: 'IndexController'
				})
				.otherwise({redirectTo : '/'});

			$mdThemingProvider
				.theme('default')
				.primaryPalette('cyan')
				.accentPalette('lime')
		})
