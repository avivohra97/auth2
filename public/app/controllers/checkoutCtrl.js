var checkOut=angular.module("checkOut",['auth'])
checkOut.controller("checkOutCtrl",function($scope,$http,$location,Auth,AuthToken){
	// $scope.checkOut=function(data){
		$scope.link;
		$scope.url;
		$scope.msg;
		$scope.id;
		$scope.username;
		$scope.email;
        $scope.pay=function(){
        	console.log("pay called")
        	$scope.msg="thanks"
        	//$location.path("/myOrders")
        	}
		$scope.list=function(){
		return $http.get('/api/getList').then(function(data){
				console.log(data.data.data)
				var obj=data.data.data;
				console.log(obj)
				console.log(obj.success)
				console.log(obj.payment_requests[0].status)
			})
		}
        $scope.status=function(){
        	return $http.post('/api/status/'+$scope.id).then(function(data){
        		console.log(data)
        	})
        }
	   return $http.get('/api/insta').then(function(data){
	   	console.log(data.data.success)

	   	console.log(data.data.data)
	   	$scope.link=data.data.data;
	   	var obj=JSON.parse($scope.link)
	   	console.log(obj)
	   	$scope.url=obj.payment_request.longurl;
	   	console.log($scope.url)
	   	$scope.id=obj.payment_request.id;
	   	console.log("id "+$scope.id)
	   	$scope.status();
	   	if(Auth.isLoggedIn()){
	   	        console.log("logged here")
	   	        Auth.getUser().then(function(data){
	   	                console.log(data);
	   	                $scope.username=data.data.username;
	   	                console.log($scope.username)
	   	                $scope.useremail=data.data.email;
	   	        })
	   	}else{
	   	        console.log("not loggged in here");
	   	         app.username="";
	   	         
	   	}    
	   })
	   
})