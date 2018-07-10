var appRoute=angular.module("appRoute",['ngRoute']);
appRoute.config(function($routeProvider,$locationProvider){
	console.log("route")
	$routeProvider
	  .when('/',{
	  	templateUrl:'app/views/pages/first.html'
	  })
	  .when('/home',{
	  	templateUrl:'app/views/pages/home.html',
	  	controller:"hCtrl",
	  	controllerAs:"home",
	  	authenticated:true
	  })
	  .when('/about',{
	  	templateUrl:'app/views/pages/about.html'
	  })
	  .when('/register',{
	  	templateUrl:'app/views/pages/users/register.html',
	  	controller:"regCtrl",
	  	controllerAs:"register",
	  	authenticated:false
	  })
	  .when("/login",{
	  	templateUrl:'app/views/pages/users/login.html',
	  	authenticated:false
	  })
	  .when('/logout',{
	  	templateUrl:'app/views/pages/users/logout.html',
	  	authenticated:true
	  })
	  .when('/profile',{
	  	templateUrl:'app/views/pages/users/profile.html',
	  	authenticated:true
	  })
	  .when('/menu',{
        templateUrl:'app/views/pages/users/menu.html',
        controller:"menuCtrl",
        controllerAs:"menu",
        authenticated:true
	  })
	  .when('/shopping-cart',{
        templateUrl:'app/views/pages/users/shopping-cart.html',
        controller:'cartCtrl',
        authenticated:true
	  })
	  .when('/checkout',{
        templateUrl:'app/views/pages/users/checkout.html',
        controller:'checkOutCtrl',
        authenticated:true
	   })
	  // .when('/myOrders',{
   //      templateUrl:'app/views/pages/users/myOrders.html',
   //      controller:'orderCtrl'
  	//    })
	  .otherwise({
        redirectTo:'/'
	  })
	  $locationProvider.html5Mode({
	    enabled: true,
	    requireBase: false
	  });
})
appRoute.run(['$rootScope','Auth','$location',function($rootScope,Auth,$location){
	$rootScope.$on("$routeChangeStart",function(event,next,current){
		// console.log(Auth.isLoggedIn())
		// console.log(next.$$route.authenticated)
		if(next.$$route.authenticated==true){
			if(!Auth.isLoggedIn()){
				event.preventDefault();
				$location.path('/');
			}
			}else if(next.$$route.authenticated==false){
				if(Auth.isLoggedIn()){
					event.preventDefault();
					$location.path('/profile')
				}
			}
	})
}])