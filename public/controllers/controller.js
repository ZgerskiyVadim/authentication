var myApp = angular.module('myApp', []);
var showApp = angular.module('showApp', []);

myApp.controller('AppCtrl', function ($scope, $http) {

	$scope.showLoginIn = false;
	$scope.login = function () {
		$scope.showLoginIn = true;
		if($scope.showRegistration){
			$scope.showRegistration = false;
		}
	};

	$scope.showRegistration = false;
	$scope.registration = function () {
		$scope.showRegistration = true;
		if($scope.showLoginIn){
			$scope.showLoginIn = false;
		}
	};
	$scope.loginstration = true
	$scope.iminside = false;
	// $scope.iminside = false;
	// $scope.enterLogin = function () {
	// 	// if ($scope.contact.name = $scope.contact) {
	// 		$scope.iminside = true;
	// 	 };
	// $scope.edit = function () {
	// 	$scope. = true;
	// }

var refresh = function () {

	$http.get('/contactlist').success(function (response) {
		$scope.contactlist = response;
		$scope.contact = "";
	});
};
refresh();

$scope.enterLogin = function () {
	//console.log($scope.contact);
	$http.post('/login', $scope.contact).success(function (response) {
		console.log(response);
		if (response.success){
			$scope.iminside = true;
			$scope.showLoginIn = false;
			$scope.loginstration = false;
			$scope.loginout = true;
		}
		refresh();
	});
};

$scope.logout = function () {
	$scope.iminside = false;
	$scope.showLoginIn = true;
	$scope.loginstration = true;
	$scope.loginout = false;
};

$scope.addContact = function () {
	console.log($scope.contact);
	$http.post('/contactlist', $scope.contact).success(function (response) {
		console.log(response);
		if (response){
			$scope.showLoginIn = true;
			$scope.showRegistration = false;
		}
		refresh();
	});
};
	
$scope.remove = function (id) {
	console.log(id);
	$http.delete('/contactlist/' + id).success(function (response) {
		refresh();
	})
}

$scope.edit = function (id) {
	console.log(id);
	$http.get('/contactlist/' + id).success(function (response) {
		$scope.contact = response;
	});
};

$scope.update =	function () {
	console.log($scope.contact._id);
	$http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function (response) {
		refresh();
	});
};

$scope.deselect = function () {
	$scope.contact = "";
};

});