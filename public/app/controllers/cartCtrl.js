var cart=angular.module("cart",[])
cart.controller("cartCtrl",function($http,$scope){
	$scope.items;
	$scope.totalPrice;
	return $http.get('/api/shopping-cart').then(function(data){
		console.log(data.data)
		$scope.items=data.data.data;
		$scope.totalPrice=data.data.totalPrice;
		console.log("tp "+$scope.totalPrice)
	})
})