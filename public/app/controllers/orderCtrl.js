var order=angular.module("order",[]);
order.controller("orderCtrl",function($http,$scope){
	$scope.msg;
	$scope.list=function(){
	return $http.get('/api/getList').then(function(data){
			console.log(data.data.data)
			var obj=data.data.data;
			console.log(obj)
			console.log(obj.success)
			console.log(obj.payment_requests[0].status)
			msg=obj.payment_requests[0].status;
		})
	}
})