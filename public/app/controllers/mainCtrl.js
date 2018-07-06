var onLogin=angular.module("onLogin",['auth']);
onLogin.controller("mainCtrl",function(Auth,AuthToken,$location,$timeout,$rootScope,$window){
        var app=this;
        app.loadme=false;
        $rootScope.$on("$routeChangeStart",function(){
            if(Auth.isLoggedIn()){
                    console.log("logged")
                    app.isLoggedIn=true;
                    Auth.getUser().then(function(data){
                            console.log(data);
                            app.username=data.data.username;
                            console.log(app.username)
                            app.useremail=data.data.email;
                            app.loadme=true;
                    })
            }else{
                    console.log("not loggged in");
                     app.username="";
                     app.isLoggedIn=false;
                     app.loadme=true;
            }    
           if($location.hash()=='_=_')$location.hash(null);
        })
        this.twitter=function(){
            console.log($window.location.protocol);
            console.log($window.location.host)
            $window.location=$window.location.protocol+'//'+$window.location.host+'/auth/twitter';
        }
       
	this.doLogin=function(loginData){
        console.log(this.loginData);
        Auth.login(this.loginData).then(function(data){
        	console.log(data.data.message);
        	console.log(data.data.success);
        	if(data.data.success){
        		this.sucessMessage=data.data.message;
        		$location.path("/about");
                        app.loginData={};
        	}else{
        		this.errorMessage=data.data.message;
        	}
        });
	}
        this.logout=function(){
                Auth.logout();
                $location.path('/logout')
                $timeout(function(){
                        $location.path('/')
                },2000);
        }

})