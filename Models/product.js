const {model, Schema,ObjectId} = require("mongoose");
const mongoose = require("mongoose");

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
 *              total_quantity: 
 *                  type: number
 *                  required: true
 *              description:
 *                  type: string
 *                  required: true
 *              offer:
 *                  type: number
 *                  required: true
 *              category:
 *                  type: string
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
    total_quantity:{
        type: Number,
        required:true
    },
    description: {
        type: String,
        required: true
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

productSchema.post('save', async () =>{
    const totalQuantity = await model("Product_variant").aggregate([
        {$match:{product_id:mongoose.Types.ObjectId(this._id)}},
        {$group:{_id:null, total:{$sum:'$quantity'}}}
    ]).exec();

    this.total_quantity = totalQuantity[0]?.total || 0;
});

productSchema.pre('save', async () =>{
    const totalQuantity = await model("Product_variant").aggregate([
        {$match:{product_id:mongoose.Types.ObjectId(this._id)}},
        {$group:{_id:null, total:{$sum:'$quantity'}}}
    ]).exec();

    this.total_quantity = totalQuantity[0]?.total || 0;
});


module.exports = model("Product", productSchema);