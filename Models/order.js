const {model,Schema, Schema} =require("mongoose");

/**
 * @swagger
 * components:
 *  schemas:
 *      Order:
 *          properties:
 *              customer_id:
 *                  type: String
 *                  required: true
 *              status:
 *                  type: String
 *                  required: true
 *              total_amount: 
 *                  type: Number
 *                  required: true
 */
const OrderSchema = new Schema({

    customer_id: {type:Schema.Types.ObjectId, ref:'User', required:true},
    status: {
        type: String,
        enum:['pending','shipped','delivered','canceled']
    },
    total_amount: Number,

    
}, {timestamps:true});

module.exports = model("Order", OrderSchema);
