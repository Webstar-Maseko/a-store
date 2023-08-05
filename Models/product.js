const {model, Schema} = require("mongoose");

/**
 * @swagger
 * components:
 *  schemas:
 *      Product:
 *          properties:
 *              name: 
 *                  type: string
 *                  required: true
 *              slug:
 *                  type: string
 *                  requiried: true
 *              sku:
 *                  type: string
 *                  required: true
 *              color:
 *                  type: string
 *                  required: true
 *              price:
 *                  type: number
 *                  required: true
 *              quantity: 
 *                  type: number
 *                  required: true
 *              description:
 *                  type: string
 *                  required: true
 *              size:
 *                  type: array
 *                  required: true
 *              offer:
 *                  type: number
 *                  required: true
 *              category:
 *                  type: object
 *                  required: true
 *              images:
 *                  type: array
 *                  required: true
 *                  items:
 *                      type: object
 *                      required: true
 *                      properties:
 *                          img:
 *                              type: string
 *                              
 * 
 * 
 */

const productSchema = new Schema({
    
    name:{
        type: String,
        required: true
    },
    slug:{
        type:String,
        required:true
    },
    sku:{
        type : String,
        required:true
    },
    color:{
        type:String,
        required:true
    },
    price:{
        type: Number,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    size: {
        type : Array,
        required: true,
    },
    offer: {
        type: Number,
        
    },
    category: {type: Schema.Types.ObjectId, ref: 'category', required: true},
    images:[ {
        img : {type: String, required: true}

    }],
    reviews: [{
        userId: {type: Schema.Types.ObjectId, ref:'user'},
        comment: String
    }],
   
    addedBy: {type: Schema.Types.ObjectId, ref: 'user', required:true},
    
     

}, {timestamps:true})

module.exports = model("Product", productSchema);