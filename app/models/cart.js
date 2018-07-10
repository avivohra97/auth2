/*(1)var schema=mongoose.Schema;
var CartSchema=new Schema({
	items:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:"items"
    }
  ],
  totalQty:{type:Number},
  totalPrice:{type:Number}
})
CartSchema.methods.Cart=function(oldcart){
	this.items=oldCart.items|| {};
	this.totalQty=oldCart.totalQty|| 0;
	this.totalPrice=oldCart.totalPrice|| 0;
}
CartSchema.methods.add=function(item,id){
		var storedItem=this.items[id];
		if(!storedItem){
			storedItem=this.items[id]={item:item,qty:0,cost:0}
		}
				storedItem.qty++;
				storedItem.cost=storedItem.item.cost*storedItem.qty;
				this.totalQty++;
				this.totalPrice+=storedItem.item.cost;
}
CartSchema.methods.generateArray=function(){
		var arr=[];
		for(var id in this.items){
			arr.push(this.items[id]);
		}
		return arr;
	}
module.exports=mongoose.model("cart",CartSchema);*/


module.exports=function Cart(oldCart){
	this.items=oldCart.items|| {};
	this.totalQty=oldCart.totalQty|| 0;
	this.totalPrice=oldCart.totalPrice|| 0;
	this.add=function(item,id){
		var storedItem=this.items[id];
		if(!storedItem){
			storedItem=this.items[id]={item:item,qty:0,cost:0}
		}
		storedItem.qty++;
		storedItem.cost=storedItem.item.cost*storedItem.qty;
		this.totalQty++;
		this.totalPrice+=storedItem.item.cost;
	}
	this.generateArray=function(){
		var arr=[];
		for(var id in this.items){
			arr.push(this.items[id]);
		}
		return arr;
	}
}
//Cannot read property '5b2e9115ac1e8b2f42eb529c' of undefined because if we pass 
//undefinedcart first it is empty leading to error
//1st it wasmodule.exports=function Cart(oldCart){
//	this.items=oldCart.items;
//	this.totalQty=oldCart.totalQty;
//	this.totalPrice=oldCart.totalPrice;
/* first make changes in api.js change var cart=new Cart(req.session.cart?req.session.cart:{});
to var cart=new Cart(req.session.cart?req.session.cart:{items:{}});
Cart {
  items:
   { '5b2f812a5ede1cf9cecaafa9': { item: [Object], qty: 1, price: NaN } },
  totalQty: NaN,
  totalPrice: NaN,
  add: [Function],
  generateArray: [Function] }
  this is the output we notice totalqty and total price is nan (resonbieng that these quantities when passed at fir
  	first insy=tance are empty so when undefined is added or operated it returns nan)
we can do same to them as {item:{}} but we can directly add flexibility to our cart in cart.js by 
changing initialization to items=oldcart.items||{}, qty=old.qty||0;*/ 