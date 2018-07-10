var menu=angular.module("menu",[])
menu.controller("menuCtrl",function($http,$scope){
   $scope.items;
  
   $scope.addItem=function(id){
   	console.log(id);
   	return $http.get('/api/add-to-cart/'+id).then(function(data){
      console.log(data.data)
      //
   	})
  }
  
  return $http.get('/api/menu').then(function(data){
   		console.log(data.data.data)
   		$scope.items=data.data.data;
   		console.log($scope.items)
   })
})