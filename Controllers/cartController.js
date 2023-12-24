const Cart = require("../Models/cart");
const product = require("../Models/product");
const Product = require("../Models/product");


exports.addItem  = async (req,res)=>{
    try{
        if(req.user){
            Cart.findOne({user: req.user._id}).then((cart) =>{

                if(cart){
                    productIndex =  cart.cartItems.findIndex(item => item.product == req.body.product)
              
                    if(productIndex !== -1){
                       cart.cartItems[productIndex].quantity += req.body.quantity;
    
                    }else{
                        cart.cartItems.push(({product:req.body.product,quantity:req.body.quantity,price:getProductPrice(req.body.product)}))
                     }
                    calculateCartTotal(cart);
                    
                    res.status(200).send(cart);
                }else{
                    const cart = new Cart({
                        user: req.user._id,
                        cartItems: req.body
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

exports.removeItem = async (req,res) =>{
    try{
        if(req.user){
            const {productId} = req.params;

           const cart = await Cart.findOne({user: req.user._id});
            if(cart){
                const productIndex = cart.cartItems.findIndex(item => item.product == productId);
                console.log(productIndex)
                if(cart.cartItems[productIndex].quantity > 0){
                    cart.cartItems[productIndex].quantity -= 1;

                }else{
                    cart.cartItems.splice(productIndex,1);
                }

                await calculateCartTotal(cart);
                res.status(204).send();

            }else{
                res.status(400).json({message: "Nothing to delete"})
            }
          

        }else{
            res.status(401).json({message:"You are not logged in for this operation." })
        }

    }catch(err){
        res.status(400).send(err);
    } 
}

const getProductPrice = async (productId) =>{

    const product = await Product.findOne({_id:product});

    return product.price;

}

const calculateCartTotal = async (cart) =>{
    console.log("We are executing")
    let totalPrice = 0;
    for(let item of cart.cartItems){
        totalPrice += item.quantity * item.price;
    }

    cart.totalPrice = totalPrice;
    await cart.save();
}