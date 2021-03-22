const {model, Schema} = require("mongoose");

const cartSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "user", required: true},

    cartItems: [{
        product: {type: Schema.Types.ObjectId, ref: "product", required: true},
        quantity: {type: Number, default:1},
        price:{type: Number, required: true}
    }]
  
}, {timestamps:true})

module.exports = model("Cart", cartSchema);