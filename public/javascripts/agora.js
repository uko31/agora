var app = angular.module('agora', ['ngResource', 'ngRoute']);

app.config(['$routeProvider', function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'partials/home.html',
			controller: 'applicationsCtrl'
		})
		.when('/application/add', {
			templateUrl: 'partials/ccx-form.html',
			controller: 'addApplicationCtrl'
		})
		.when('/application/edit/:id', {
			templateUrl: 'partials/ccx-form.html',
			controller: 'editCCXCtrl'
		})
		.when('/application/trash/:id', {
			templateUrl: 'partials/ccx-delete.html',
			controller: 'deleteCCXCtrl'
		})
		.otherwise({
			redirectTo: '/'
		}
	);
}]);

app.controller('applicationsCtrl', ['$scope', '$resource', '$routeParams', 
	function($scope, $resource, $routeParams) {
		var applications = $resource('/api/ccx');

		applications.query( function(ccx) {
			$scope.ccx = ccx;
		});
	}
]);

app.controller('addApplicationCtrl', ['$scope', '$resource', '$location',
	function($scope, $resource, $location) {

		$scope.save = function() {
			var applications = $resource('/api/ccx');

			applications.save(
				$scope.ccx,
				function() {
					$location.path('/');
				}
			);			
		};

		$scope.cancel = function() {
			$location.path('/');
		}
	}
]);

app.controller('editCCXCtrl', ['$scope', '$resource', '$location', '$routeParams',
	function($scope, $resource, $location, $routeParams) {
		var applications = $resource(
			'/api/ccx/:id',
			{ id: '@_id' },
			{ update: { method: 'PUT' } }
		);

		applications.get( 
			{ id: $routeParams.id },
			function(data) {
				$scope.ccx = data;
			}
		);

		$scope.save = function() {
			applications.update($scope.ccx, function() {
				$location.path('/');
			});
		}

		$scope.cancel = function() {
			$location.path('/');
		}		
	}
]);

app.controller('deleteCCXCtrl', ['$scope', '$resource', '$location', '$routeParams',
	function($scope, $resource, $location, $routeParams) {
		var applications = $resource(
			'/api/ccx/:id',
			{ id: '@_id' }
		);

		applications.get( 
			{ id: $routeParams.id },
			function(data) {
				$scope.ccx = data;
			}
		);

		$scope.delete = function() {
			applications.delete({ id: $routeParams.id }, function() {
				$location.path('/');
			});
		}

		$scope.cancel = function() {
			$location.path('/');
		}
	}
]);