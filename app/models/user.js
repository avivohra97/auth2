var mongoose=require('mongoose');
var bcrypt  =require('bcrypt-nodejs');
var schema  =mongoose.Schema;
var titlize = require('mongoose-title-case');
var validate=require('mongoose-validator');
var nameValidator=[
validate({
	validator:'matches',
	arguments:/^(([a-zA-Z]{3,20})+[ ]+([a-zA-Z]{3,20})+)+$/,
	message:"Must be atleast 3 characters,max 30,no special character,must have space"
})
]
var emailValidator=[
validate({
	validator:'isEmail',
	message:'is not a valid mail'
}),
validate({
	validator:'isLength',
	arguments:[3,25],
	message:'email should be between {ARGS[0]} and {ARGS[1]} characters'
})
]
var usernameValidator=[
validate({
	validator:'isLength',
	arguments:[3,25],
	message:'Username should be between {ARGS[0]} and {ARGS[1]} characters'
}),
validate({
	validator:'isAlphanumeric',
	message:"username must have letter and word only"
})
]
var passwordValidator=[
validate({
	validator:'matches',
	arguments:/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{6,15}$/,
	message:"length from 6 to 15 and np special char"
})
]
var UserSchema=new schema({
	name:{type:String,required:true,validate:nameValidator},
	username:{type:String,required:true,unique:true,validate:usernameValidator},
	password:{type:String,required:true},//validate:passwordValidator},
	email:{type:String,required:true,unique:true}//,validate:emailValidator},
	// active:{type:boolean,required:true,default:false},
	// temporarytoken:{type:String,required:true}
	//start
	/*cart :{
			items:[
		    {
		      type: mongoose.Schema.Types.ObjectId,
		      ref:"items"
		    }
		  ],
		  totalQty:{type:Number},
		  totalPrice:{type:Number}
	}*/
	//end
})
//start2
/*UserSchema.methods.Cart=function(oldcart){
	this.items=oldCart.items|| {};
	this.totalQty=oldCart.totalQty|| 0;
	this.totalPrice=oldCart.totalPrice|| 0;
}
UserSchema.methods.add=function(item,id){
		var storedItem=this.items[id];
		if(!storedItem){
			storedItem=this.items[id]={item:item,qty:0,cost:0}
		}
				storedItem.qty++;
				storedItem.cost=storedItem.item.cost*storedItem.qty;
				this.totalQty++;
				this.totalPrice+=storedItem.item.cost;
}
UserSchema.methods.generateArray=function(){
		var arr=[];
		for(var id in this.items){
			arr.push(this.items[id]);
		}
		return arr;
	}*/
	//end2
	UserSchema.plugin(titlize, {
	  paths: [ 'name' ], // Array of paths
	});
UserSchema.pre('save',function(next){
	var user=this;
	bcrypt.hash(user.password,null,null,function(err,hash){
         if(err) return next(err);
		user.password=hash;
		next();
	})
})
UserSchema.methods.comparePassword=function(password){
	return bcrypt.compareSync(password,this.password)
}
module.exports=mongoose.model('User',UserSchema);