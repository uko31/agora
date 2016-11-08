var app = angular.module('agora', ['ngResource', 'ngRoute']);

app.config(['$routeProvider', function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'partials/home.html',
			controller: 'ccxCtrl'
		})
		.when('/add-ccx', {
			templateUrl: 'partials/ccx-form.html',
			controller: 'addCCXCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
}]);

app.controller('ccxCtrl', ['$scope', '$resource', 
	function($scope, $resource) {
		var ccx = $resource('/api/ccx');

		ccx.query(function(ccx) {
			$scope.ccx = ccx;
		})
	}

]);

app.controller('addCCXCtrl', ['$scope', '$resource', '$location',
	function($scope, $resource, $location) {

		$scope.save = function() {
			var CCX = $resource('/api/ccx');

			CCX.save(
				$scope.ccx,
				function() {
					$location.path('/');
				}
			);			
		};
}]);
