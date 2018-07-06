var userApp=angular.module("userApp",['appRoute','userCtrl','userServices','onLogin','auth']);
userApp.config(function($httpProvider){
	console.log("home");
	$httpProvider.interceptors.push('AuthInterceptors')
})