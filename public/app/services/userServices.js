var userServices=angular.module("userServices",[]);
userServices.factory("User",function($http){
	userFactory={};
	userFactory.create=function(regData){
		return $http.post("/api/users",regData)
	}
	return userFactory;
})