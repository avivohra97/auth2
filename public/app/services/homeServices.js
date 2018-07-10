var homeService=angular.module("homeService",[]);
homeService.factory("Home",function($http){
	homeFactory={};
	homeFactory.create=function(pnumber){
		return $http.post("/api/check",pnumber).then(function(data){
			console.log(data)
			return data;
		})
	}
	return homeFactory;
})






