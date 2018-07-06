var express=require('express'),
    morgan =require('morgan'),
   mongoose=require('mongoose'),
   router  =express.Router();
   appRoutes=require('./app/routes/api')(router),
 bodyParser=require('body-parser'),
     path  =require('path'),
   passport=require("passport"),
    app    =express();
var  social  =require('./app/passport/passport')(app,passport);
var port   =process.env.PORT ||8080;
app.use(morgan('dev'));
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use("/api",appRoutes);
mongoose.connect('mongodb://localhost:27017/auth',function(err){
	if(err){
		console.log('not connected'+err);
	}
	else{
		console.log("connected")
	}
});
app.get('*',function(req,res){
	res.sendFile(path.join(__dirname+'/public/app/views/index.html'));
})
app.listen(port,function(){
	console.log('running')
})
