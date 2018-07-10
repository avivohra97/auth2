var mongoose=require('mongoose');
var schema  =mongoose.Schema;
var pnrSchema=new schema({
	id:{type:Number,required:true,unique:true},
	name:{type:String,required:true},
	trainNo:{type:Number,required:true},
	from:{type:String,required:true},
	to:{type:String,required:true},
	station:[
    {
      type:String
    }
	]
})

module.exports=mongoose.model('pNum',pnrSchema);
