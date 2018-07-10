var User=require("../models/user");
var itemData=require("../models/items");
var mock1=require("../models/mockData");
var Cart=require("../models/cart");
var jwt =require("jsonwebtoken");
var secret="youmessedup";
//var cart;
var Insta=require('instamojo-nodejs');
Insta.setKeys("test_aadff447430d9792c4cd8292590","test_44efde80a1f1b3676451ff77880");
Insta.isSandboxMode(true);
module.exports=function(router){
router.post('/users',function(req,res){
	var user=new User();
	user.username=req.body.username;
	user.password=req.body.password;
	user.email=req.body.email;
	user.name=req.body.name;
	//user.temporarytoken=jwt.sign({username:user.username,email:user.email},secret,{expiresIn:'24h'});
	//user.cart=new Cart();
	// user.cart={};
	// user.cart.items={};
	// user.cart.totalQty=0;
	// user.cart.totalPrice=0;
	if(req.body.username==null||req.body.username==""||req.body.password==null||req.body.password==""||req.body.email==null||req.body.email==""||
		req.body.name==""||req.body.name==null){
		res.json({success:false,message:"something missing"})
	}else{
	user.save(function(err){
		if(err){
			if(err.errors=!null){
			     if(err.errors.name){
			     	console.log("name erroe")
				res.json({success:false,message:err.errors.name.message})
			  }
			  else if(err.errors.email){
			  	console.log("email erroe")
				res.json({success:false,message:err.errors.email.message})
			  }
			   else if(err.errors.username){
			   	console.log("username erroe")
				res.json({success:false,message:err.errors.username.message})
			  }

			  else if(err.errors.password){
			  	console.log("password erroe")
				res.json({success:false,message:err.errors.password.message})
			  }
			  else{
			  	console.log("some erroe")
			  	if(err){
			  		if(err.code==11000){
	       				if(err.errmsg[57]=="u"){
  							console.log("duplicate name")
		   			       res.json({success:false,message:"duplicate username"})
  					   }
  				        else if(err.errmsg[57]=="e"){
			  		       	console.log("duplicate email")
			  	            res.json({success:false,message:"duplicate email"})
				       }
				    }else{
			        	console.log("Some erroe")
			  	    	res.json({success:false,message:err})
			 	    }
                }
			  	//res.json({success:false,message:err})
			  }
			}//else 		
		}else{
			res.json({success:true,message:"check mail for activation"})
		}
	});
   }
})
router.post("/authenticate",function(req,res){
	console.log("hiiii "+req.body.username)
	User.findOne({username:req.body.username}).select("email username password").exec(function(err,user){
		if(err) throw err;
		if(!user){
			res.json({success:false,message:"could not Authenticate"});
		}else if(user){
			if(req.body.password){
				var validPassword=user.comparePassword(req.body.password);
			}else{
				res.json({success:false,message:"password required"})
			}
			if(!validPassword){
				res.json({success:false,message:"could not authenticate password"})
			}else{
				var token=jwt.sign({username:user.username,email:user.email},secret,{expiresIn:'24h'});
				req.session.user=user;
				console.log(req.session.user)
				//user.cart=cart;
				res.json({success:true,message:"user authenticated",token:token})
			}
		}
	})
})
router.post("/checkUsername",function(req,res){
	console.log("hiiii 1 "+req.body.username)
	User.findOne({username:req.body.username}).select("username").exec(function(err,user){
		if(err) throw err;
		if(!user){
			res.json({success:true,message:"valid username"});
		}else{
		res.json({success:false,message:"name taken"}) 
		}
	})
})
router.post("/checkEmail",function(req,res){
	console.log("hiiii 2 "+req.body.username)
	User.findOne({email:req.body.email}).select("email").exec(function(err,user){
		if(err) throw err;
		if(!user){
			res.json({success:true,message:"valid email"});
		}else{
		res.json({success:false,message:"email exist"}) 
		}
	})
})
router.use(function(req,res,next){
	var token=req.body.token||req.body.query||req.headers['x-access-token'];
	if(token){
		jwt.verify(token,secret,function(err,decoded){
			if(err){
				res.json({success:false,message:'token invalid'});
			}else{
				req.decoded=decoded;
				next();
			}
		})
	}else{
		res.json({success:false,message:'no token provided'});
	}
})
router.post('/me',function(req,res){
	res.send(req.decoded);
})
router.post('/check',function(req,res){
	console.log("hiii "+req.body.num)
	var x=parseInt(req.body.num)
	console.log(typeof(x))
	mock1.find().exec(function(err,data){
		if(err) throw err
			else{
				if(!data){
					console.log(data);
		res.json({success:false,message:"not found",data:data})
				}
				else{
				console.log(data);
		res.json({success:true,message:"great",data:data,id:x})
	}
			}
		
	})
	
})
router.get('/menu',function(req,res){
	itemData.find().exec(function(err,data){
		if(err) throw err;
		else{
			if(!data){
				console.log("menu not found")
				res.json({success:false,message:"no menu"})
			}else{
				console.log("menu found")
				res.json({success:true,message:"menu found",data:data})
			}
		}
	})
})
router.get('/add-to-cart/:id',function(req,res){
	var itemId=req.params.id;
	console.log("id here "+itemId)
	
	var cart=new Cart(req.session.cart?req.session.cart:{items:{}});
	itemData.findById(itemId,function(err,item){
		if(err) throw err
	 cart.add(item,item.id)
		req.session.cart=cart;
		console.log(req.session.cart)
		// res.redirect('/menu')
		res.json({success:true,id:itemId,qty:req.session.cart.totalQty})
	})
   /*2 if(req.session.user.cart){
    	cart.Cart(req.session.user.cart)
    }else{
    	cart.Cart({items:{}})
    }
    itemData.findById(itemId,function(err,item){
    		if(err) throw err
    	 cart.add(item,item.id)
    		req.session.user.cart=cart;
    		console.log(req.session.user.cart)
    		// res.redirect('/menu')
    		res.json({success:true,id:itemId,qty:req.session.cart.totalQty})
    	})*/
   /* var cart=new Cart(req.session.user.cart?req.session.user.cart:{items:{}});
    itemData.findById(itemId,function(err,item){
    	if(err) throw err
     cart.add(item,item.id)
    	req.session.user.cart=cart;
    	console.log(req.session.cart)
    	// res.redirect('/menu')
    	res.json({success:true,id:itemId,qty:req.session.cart.totalQty})
    })*/
     
})
router.get('/shopping-cart',function(req,res){
	if(!req.session.cart){
		res.json({success:false,message:"empty cart",data:null,totalPrice:0})
	}
	if(req.session.user){
		console.log(req.session.user)
	}
	var cart=new Cart(req.session.cart);
	res.json({success:true,message:"cart not empty",data:cart.generateArray(),totalPrice:cart.totalPrice,user:req.session.user})

})
router.get('/insta',function(req,res){
	if(!req.session.cart){
		res.json({success:false,message:"empty cart",data:null,totalPrice:0})
	}
	var purpose="";
	var cart=new Cart(req.session.cart)
	var data = new Insta.PaymentData();
	var cartArray=cart.generateArray();
	for(var i=0;i<cartArray.length;i++){
		 purpose+=cartArray[i].item.name+", ";
	}
	data.purpose = purpose;            // REQUIRED
	data.amount = cart.totalPrice;     
	data.allow_repeated_payments = 'False';
	if(req.session.user){
		data.send_email              = 'True';  
		data.email                   = req.session.user.email;
	}
	
	// data.phone                   = 1234567890;           // REQUIRED
	//data.setRedirectUrl(REDIRECT_URL);
	 var name=req.user;
	Insta.createPayment(data, function(error, response) {
	  if (error) {
	    // some error
	  } else {
	    // Payment redirection link at response.payment_request.longurl
         console.log(response);
         res.json({success:true,data:response,name:name})
	    }
	});
})
router.get('/getList',function(req,res){
	if(!req.session.cart){
		res.json({success:false,message:"empty cart",data:null,totalPrice:0})
	}
	Insta.getAllPaymentRequests(function(error, response) {
	  if (error) {
	    // Some error
	  } else {
	    console.log(response);
	    res.json({data:response})
	  }
	});

})
router.post("/status/:id",function(req,res){
	if(!req.session.cart){
		res.json({success:false,message:"empty cart",data:null,totalPrice:0})
	}
	var id=req.params.id;
	
	Insta.getPaymentRequestStatus(
id, function(error, response) {
	  if (error) {
	    // Some error
	  } else {
	    console.log(response);
	    res.json({success:true,data:response});
	  }
	});
})
return router;
}