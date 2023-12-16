const {model,Schema} = require("mongoose")

/**
 * @swagger
 * components:
 *  schemas:
 *      Product_Variant:
 *          properties:
 *              product_id:
 *                  type: String
 *                  required: true
 *              size:
 *                  type: String
 *                  required: true
 *              quantity:
 *                  type: number
 *                  required: true
 * 
 */
const product_variantSchema = new Schema({
    product_id:{
        type:Schema.Types.ObjectId, 
        ref:"Product",
         required:true},
    size:{type:String, lowercase:true, maxLength:[6,"That is an incorrect size, please confirm"]},
    quantity:Number
})



module.exports = model("Product_variant",product_variantSchema);