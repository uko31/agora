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