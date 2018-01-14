angular.module('tracker', [])
	.controller('timeCntrl', function($scope, $http) {
		$scope.addTime = function(){
			$scope.addButton={};
			$scope.result={};
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
				$scope.result.ok = true;
			}, function(data, status) {
			    console.log(data);
			    console.log(status);
				$scope.addStart = '';
				$scope.addEnd = '';
				$scope.addEmail = '';
				$scope.addButton.disabled=false;
				$scope.result.error = true;
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
				}, function(response) {
					$scope.times = response.data;
					$scope.searchEmail = '';
					$scope.searchButton.disabled=false;
				});
		}
	})
	.directive('datepicker', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attr, mCtrl) {
            function myValidation(value) {
				var parts = value.match(/(\d+)/g);				
                if (parts && parts.length == 5 && !isNaN( Date.parse(parts[2]+"-"+(parts[1]-1)+"-"+parts[0]+"T"+parts[3]+":"+parts[4]) )) {
                    mCtrl.$setValidity('charE', true);
                } else {
                    mCtrl.$setValidity('charE', false);
                }
                return value;
            }
            mCtrl.$parsers.push(myValidation);
        }
    };
});
