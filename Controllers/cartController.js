const Cart = require("../Models/cart")


exports.addItem  = (req,res)=>{
    try{
        if(req.user){
            Cart.findOne({user: req.user._id}).then((cart) =>{
                cart.cartItems


                
                if(cart){
                   Cart.findOneAndUpdate({user: req.user._id}, {
                      "$push":{
                          "cartItems": req.body.cartItems
                      } 
                   }).then((data) =>{ 
                        res.json(data);
                   }).catch(err => res.status(400).json(err));
    
                }else{
    
                    const cart = new Cart({
                        user: req.user._id,
                        cartItems: req.body.cartItems
                    });
                    cart.save(cart).then( x =>{
                         res.send(cart);
                    }).catch(error => res.status(400).json(error));
                }
            }).catch(err => res.status(400).json(err));
    
    
    
        }else{
            res.status(401).send({message:"You are not logged in for this operation."})
        }
    }catch(error){
        res.status(500).json({message:"internal server error"})
    }
    
}

exports.getCart = async (req,res) =>{
    try{
        if(req.user){
            const cart = await Cart.find({user:req.user._id}).lean().exec();

            res.status(200).json(cart);


        }else{
            res.status(401).json({message: "You are not logged in for this operation."})
        }

    }catch{(error) => res.status(500).json(error)};
}