angular.module('tracker', [])
	.controller('timeCntrl', function($scope, $http) {
		$scope.addTime = function(){
			$scope.addButton={};
			$scope.addButton.disabled=true;
			
			$http({

			    method: 'POST',
			    url: '/times/',
			    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			    data: 'email=' + $scope.addEmail + '&start=' + $scope.addStart + '&end=' + $scope.addEnd,

			}).then(function(data, status) {
			    console.log(data);
			    console.log(status);
				$scope.addStart = '';
				$scope.addEnd = '';
				$scope.addEmail = '';
				$scope.addButton.disabled=false;
			});
		
		}
		$scope.searchTime = function(){
			$scope.searchButton={};
			$scope.searchButton.disabled=true;
			
			$http.get('/times/?email=' + $scope.searchEmail)
				.then(function(response) {
					$scope.times = response.data;
					$scope.searchEmail = '';
					$scope.searchButton.disabled=false;
				});
		}
})