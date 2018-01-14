angular.module('tracker', [])
	.controller('timeCntrl', function($scope, $http) {
		$scope.addTime = function(){
			$http({

			    method: 'POST',
			    url: '/times/',
			    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			    data: 'email=' + $scope.addEmail + '&start=' + $scope.addStart + '&end=' + $scope.addEnd,

			}).success(function(data, status) {
			    console.log(data);
			    console.log(status);
				$scope.addStart = '';
				$scope.addEnd = '';
				$scope.addEmail = '';
			});
			
/*			$http.post('/times/', {email: $scope.addEmail, start: $scope.addStart, end: $scope.addEnd})
				.then(function(response) {
					$scope.addStart = '';
					$scope.addEnd = '';
					$scope.addEmail = '';
				});
*/		}
		$scope.searchTime = function(){
			$http.get('/times/?email=' + $scope.searchEmail)
				.then(function(response) {
					$scope.times = response.data;
					$scope.searchEmail = '';
				});
		}
})