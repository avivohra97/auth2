var userApp=angular.module("userApp",['appRoute','userCtrl','userServices',"order",'onLogin','auth',"homeCtrl","homeService","menu",'cart','checkOut']);
userApp.config(function($httpProvider){
	console.log("home");
	$httpProvider.interceptors.push('AuthInterceptors')
})