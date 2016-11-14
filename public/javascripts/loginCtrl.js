app.controller('loginCtrl', ['$scope', '$resource', '$routeParams', '$location',
	function($scope, $resource, $routeParams, $location) {
		var user = $resource( '/api/users/:username', { username: "@username" } );

		$scope.login = function() {
			
			if ( $scope.user.username ) {
				user.get( 
					{ username: $scope.user.username },
					function( user ) {
						if ( (user.username == $scope.user.username) && 
							   (user.password == $scope.user.password) ) {
							$location.path('/');
						} else {
							$location.path('/login');
						}
					}
				);
			}
			/*
			users.query(
				function( users ) {
					users.forEach( function( user ) {
						if ( $scope.user.username == user.username && $scope.user.password == user.password ) {

							$location.path('/applications');

						}

					});
				}
			);
			*/
		}

	}
]);
