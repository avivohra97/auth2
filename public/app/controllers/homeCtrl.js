var homeCtrl=angular.module("homeCtrl",["homeService"]);
homeCtrl.controller("hCtrl",function($http,$location,Home,$scope){
       $scope.note="high"
       $scope.view=false
       $scope.from="--";
       $scope.to="--"
       $scope.stations;
      this.seePnr=function(pnumber){
        console.log("onr");
        console.log(this.pnumber);
        var arr=new Array();
        Home.create(this.pnumber).then(function(data){
                console.log(data.data.message);
                console.log(data.data.success);
                console.log(data.data.data)
                var length=data.data.data.length;
                
                for(var i=0;i<length;i++){
                  arr[i]=data.data.data[i].id;
                  console.log("term "+arr[i])
                }
                var x=data.data.id;
                console.log(typeof(x));
                var c=0;
                for (var i = 0; i <arr.length; i++) {
                              if(arr[i]===x){
                               console.log("yippy");
                               this.loadme=true;
                               console.log(this.loadme)
                               $scope.view=true;
                               $scope.from=data.data.data[i].from;
                               $scope.to=data.data.data[i].to;
                               console.log(data.data.data[i].from)
                               $scope.stations=data.data.data[i].station;
                              // $location('/welcome')
                               c=1;
                               break;
                              }
                       };
                       if(c==0){console.log("ohhni ")
                     // this.loadme=false;
             this.loadme=false;
             console.log(this.loadme)
               }
                       

        })
         console.log(this.pnumber);
         
      }
})
