var userCtrl=angular.module("userCtrl",['userServices']);
userCtrl.controller("regCtrl",function($http,$location,User){
        var app=this;
	this.regUser=function(regData,valid){
		console.log("reg")
        console.log(this.regData);
        // if(valid){
        User.create(this.regData).then(function(data){
                console.log(data)
        	console.log(data.data.message);
        	console.log(data.data.success);
        	if(data.data.success){
        		this.sucessMessage=data.data.message;
        		$location.path("/");
        	}else{
        		this.errorMessage=data.data.message;
        	}
        });
      // }else{
      //   this.errorMessage="please fill form"
      // }
    }
    // this.checkUsername=function(regData){
    //     User.checkUsername(app.regData).then(function(data){
    //             console.log(data)
    //     })
    // }
    //  Custom function that checks if username is available for user to use    
        this.checkUsername = function(regData) {
            app.checkingUsername = true; // Start bootstrap loading icon
            app.usernameMsg = false; // Clear usernameMsg each time user activates ngBlur
            app.usernameInvalid = false; // Clear usernameInvalid each time user activates ngBlur

            // Runs custom function that checks if username is available for user to use
            User.checkUsername(app.regData).then(function(data) {
                // Check if username is available for the user
                if (data.data.success) {
                    app.checkingUsername = false; // Stop bootstrap loading icon
                    app.usernameMsg = data.data.message; // If successful, grab message from JSON object
                } else {
                    app.checkingUsername = false; // Stop bootstrap loading icon
                    app.usernameInvalid = true; // User variable to let user know that the chosen username is taken already
                    app.usernameMsg = data.data.message; // If not successful, grab message from JSON object
                }
            });
        };

        // Custom function that checks if e-mail is available for user to use       
        this.checkEmail = function(regData) {
            app.checkingEmail = true; // Start bootstrap loading icon
            app.emailMsg = false; // Clear emailMsg each time user activates ngBlur
            app.emailInvalid = false; // Clear emailInvalid each time user activates ngBlur

            // Runs custom function that checks if e-mail is available for user to use          
            User.checkEmail(app.regData).then(function(data) {
                // Check if e-mail is available for the user
                if (data.data.success) {
                    app.checkingEmail = false; // Stop bootstrap loading icon
                    app.emailMsg = data.data.message; // If successful, grab message from JSON object
                } else {
                    app.checkingEmail = false; // Stop bootstrap loading icon
                    app.emailInvalid = true; // User variable to let user know that the chosen e-mail is taken already
                    app.emailMsg = data.data.message; // If not successful, grab message from JSON object
                }
            });
        };
    })
.directive("match",function(){
        return{
                restrict:'A',
                controller:function($scope){
                        $scope.confirmed=false;
                        $scope.doConfirm=function(values){
                          values.forEach(function(ele){
                                if($scope.confirm==ele){
                                        $scope.confirmed=true;
                                }else{
                                        $scope.confirmed=false;
                                }
                          })
                        }
                },
                link:function(scope,element,attrs){
                        attrs.$observe('match',function(){
                                scope.matches=JSON.parse(attrs.match);
                                scope.doConfirm(scope.matches)
                        })
                        scope.$watch('confirm',function(){
                                scope.matches=JSON.parse(attrs.match);
                                scope.doConfirm(scope.matches)
                        })
                }
        }
})
// })
//E11000 duplicate key error collection: auth.users index: email_1 dup key: { : "parth@gmail.com" }