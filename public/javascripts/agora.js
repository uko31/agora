var app = angular.module('agora', ['ngResource', 'ngRoute']);

app.config(['$routeProvider', function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'partials/home.html',
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
			templateUrl: 'partials/application-form.html',
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

app.controller('applicationsListCtrl', ['$scope', '$resource', '$routeParams', 
	function($scope, $resource, $routeParams) {
		var applications = $resource('/api/applications');

		applications.query( function(applications) {
			$scope.applications = applications;
		});
	}
]);

app.controller('applicationsAddCtrl', ['$scope', '$resource', '$location',
	function($scope, $resource, $location) {

		var socles = $resource('/api/socles');
		socles.query( function(socles) {
			$scope.socles = socles;
		});

		$scope.save = function() {
			var applications = $resource('/api/applications');

			applications.save(
				$scope.application,
				function() {
					$location.path('/applications');
				}
			);			
		};

		$scope.cancel = function() {
			$location.path('/applications');
		}
	}
]);

app.controller('applicationsEditCtrl', ['$scope', '$resource', '$location', '$routeParams',
	function($scope, $resource, $location, $routeParams) {
		var applications = $resource(
			'/api/applications/:id',
			{ id: '@_id' },
			{ update: { method: 'PUT' } }
		);

		var socles = $resource('/api/socles');
		socles.query( function(socles) {
			$scope.socles = socles;
		});

		applications.get( 
			{ id: $routeParams.id },
			function(data) {
				$scope.application = data;
			}
		);

		$scope.save = function() {
			applications.update($scope.application, function() {
				$location.path('/applications');
			});
		}

		$scope.cancel = function() {
			$location.path('/applications');
		}		
	}
]);

app.controller('applicationsDeleteCtrl', ['$scope', '$resource', '$location', '$routeParams',
	function($scope, $resource, $location, $routeParams) {
		var applications = $resource(
			'/api/applications/:id',
			{ id: '@_id' }
		);

		applications.get( 
			{ id: $routeParams.id },
			function(data) {
				$scope.application = data;
			}
		);

		$scope.delete = function() {
			applications.delete({ id: $routeParams.id }, function() {
				$location.path('/applications');
			});
		}

		$scope.cancel = function() {
			$location.path('/applications');
		}
	}
]);

app.controller('soclesListCtrl', ['$scope', '$resource', '$routeParams', 
	function($scope, $resource, $routeParams) {
		var socles = $resource('/api/socles');

		socles.query( function(socles) {
			$scope.socles = socles;
		});
	}
]);

app.controller('soclesAddCtrl', ['$scope', '$resource', '$location',
	function($scope, $resource, $location) {

		$scope.save = function() {
			var applications = $resource('/api/socles');

			applications.save(
				$scope.socle,
				function() {
					$location.path('/socles');
				}
			);			
		};

		$scope.cancel = function() {
			$location.path('/socles');
		}
	}
]);

app.controller('soclesEditCtrl', ['$scope', '$resource', '$location', '$routeParams',
	function($scope, $resource, $location, $routeParams) {
		var socles = $resource(
			'/api/socles/:id',
			{ id: '@_id' },
			{ update: { method: 'PUT' } }
		);

		socles.get( 
			{ id: $routeParams.id },
			function(socle) {
				$scope.socle = socle;
			}
		);

		$scope.save = function() {
			socles.update($scope.socle, function() {
				$location.path('/socles');
			});
		}

		$scope.cancel = function() {
			$location.path('/socles');
		}		
	}
]);

app.controller('soclesDeleteCtrl', ['$scope', '$resource', '$location', '$routeParams',
	function($scope, $resource, $location, $routeParams) {
		var socles = $resource(
			'/api/socles/:id',
			{ id: '@_id' }
		);

		socles.get( 
			{ id: $routeParams.id },
			function(socle) {
				$scope.socle = socle;
			}
		);

		$scope.delete = function() {
			socles.delete({ id: $routeParams.id }, function() {
				$location.path('/socles');
			});
		}

		$scope.cancel = function() {
			$location.path('/socles');
		}
	}
]);