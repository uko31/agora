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

		$scope.save2 = function() {
			var applications = $resource('/api/applications');

			if ( $scope.application.socle == "STMC" )  {
				$scope.application.espaces = [];
			}

			applications.query(
				{ ccx: $scope.application.ccx }, 
				function( records ) {

					if ( records ) {
						applications.save(
							$scope.application,
							function() {
								$location.path('/applications/add');
							}
						);
					}
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
