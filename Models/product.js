const {model, Schema} = require("mongoose");

const productSchema = new Schema({
    category: String,
    name: String,
    price: Number,
    quantity: Number,
    description: String,
    image:[],
    size: String,

})

module.export = model("Product", productSchema);