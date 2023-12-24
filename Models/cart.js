const {model, Schema} = require("mongoose");

/**
 * @swagger
 * components:
 *  schemas:    
 *      Cart:
 *          properties:
 *              user:
 *                  type: String
 *                  required: true
 *              cartItems:
 *                  type: array
 *                  required: true
 *                  items:
 *                      type: object
 *                      properties:
 *                          product: 
 *                              type: string
 *                              required: true
 *                          quantity:
 *                              type: number
 *                              requried: true
 *                              default: 1
 *                          color:
 *                              type: string
 *                              required: true
 *                          size:
 *                              type: string
 *                              required: true
 *                          price:
 *                               type: number
 *                               required: true
 *          
 */
const cartSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "user", required: true},

    cartItems: [{
        product: {type: Schema.Types.ObjectId, ref: "product", required: true},
        quantity: {type: Number, default:1},
        color:{type:String},
        price:{type: Number, required: true}
    }],
    totalPrice: {type:Number, required:true}
  
}, {timestamps:true})

module.exports = model("Cart", cartSchema);