var userCtrl=angular.module("userCtrl",['userServices']);
userCtrl.controller("regCtrl",function($http,$location,User){
	this.regUser=function(regData){
		console.log("reg")
        console.log(this.regData);
        User.create(this.regData).then(function(data){
        	console.log(data.data.message);
        	console.log(data.data.success);
        	if(data.data.success){
        		this.sucessMessage=data.data.message;
        		$location.path("/");
        	}else{
        		this.errorMessage=data.data.message;
        	}
        });
	}
})

