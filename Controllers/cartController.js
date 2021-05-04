const Cart = require("../Models/cart")


exports.addItem  = (req,res)=>{
    if(req.user){
        Cart.findOne({user: req.user._id}).exec((error, cart) =>{
            error && res.send(error);
            if(cart){
               Cart.findOneAndUpdate({user: req.user._id}, {
                  "$push":{
                      "cartItems": req.body.cartItems
                  } 
               }).exec((error, data) =>{ 
                   error ? res.send(error) : res.send(data)
               })


            }else{

                const cart = new Cart({
                    user: req.user._id,
                    cartItems: req.body.cartItems
                });
                cart.save((error, cart) =>{
                    error ? res.send(error) : res.send(cart);
                })
            }
        })



    }else{
        res.send("log in")
    }
}