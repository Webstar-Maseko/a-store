const {model, Schema} = require("mongoose");

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