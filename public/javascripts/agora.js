var app = angular.module('agora', ['ngResource', 'ngRoute']);

app.config(['$routeProvider', function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'partials/home.html'
		})
		.when('/login', {
			templateUrl: 'partials/login.html',
			controller: 'loginCtrl'
		})
		.when('/applications', {
			templateUrl: 'partials/applications.html',
			controller: 'applicationsListCtrl'
		})
		.when('/applications/add', {
			templateUrl: 'partials/application-form-v2.html',
			controller: 'applicationsAddCtrl'
		})
		.when('/applications/edit/:id', {
			templateUrl: 'partials/application-form-v2.html',
			controller: 'applicationsEditCtrl'
		})
		.when('/applications/delete/:id', {
			templateUrl: 'partials/application-delete.html',
			controller: 'applicationsDeleteCtrl'
		})
		.when('/socles', {
			templateUrl: 'partials/socles.html',
			controller: 'soclesListCtrl'
		})
		.when('/socles/add', {
			templateUrl: 'partials/socle-form.html',
			controller: 'soclesAddCtrl'
		})
		.when('/socles/edit/:id', {
			templateUrl: 'partials/socle-form.html',
			controller: 'soclesEditCtrl'
		})
		.when('/socles/delete/:id', {
			templateUrl: 'partials/socle-delete.html',
			controller: 'soclesDeleteCtrl'
		})
		.otherwise({
			redirectTo: '/'
		}
	);
}]);
