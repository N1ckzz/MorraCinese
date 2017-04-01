(function(){
	'use strict';

	angular.module('App.morraCinese')
	.config(config);


	function config($routeProvider, $locationProvider){

		$routeProvider
			.when('/home', {
				templateUrl: 'app/morraCinese/views/home.html',
				controller: 'morraCineseCtrl',
				controllerAs: 'morraCtrl'
			})
			.when('/gioco', {
				templateUrl: 'app/morraCinese/views/game.html',
				controller: 'morraCineseCtrl',
				controllerAs: 'morraCtrl'
			})
			.otherwise({ redirectTo: '/home'});

			//questo serve per fa si che angular rimuova il # nella barra degli indirizzi
			$locationProvider.html5Mode({
				enabled: true,
				requireBase: false
			});
	}
})();
