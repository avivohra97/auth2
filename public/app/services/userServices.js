var userServices=angular.module("userServices",[]);
userServices.factory("User",function($http){
	userFactory={};
	userFactory.create=function(regData){
		return $http.post("/api/users",regData)
	}
	userFactory.checkUsername=function(regData){
		return $http.post('/api/checkUsername',regData)
	}
	userFactory.checkEmail=function(regData){
		return $http.post('/api/checkEmail',regData)
	}
	return userFactory;
})