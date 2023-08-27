const {model,Schema} = require("mongoose");

const OrderItemSchema = new Schema({
    order_id: {type:Schema.Types.ObjectId, ref: "Order", required:true},
    items:[
        {
            product_id: {type:Schema.Types.ObjectId, ref:"Product_variant", required:true},
            quantity: Number,
            size:String,
            subtotal: Number 
        }

    ]

},{timestamps:true})
