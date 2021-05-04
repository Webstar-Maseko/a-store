const {model, Schema} = require("mongoose");


const CategorySchema = new Schema({
    name: String,
    slug: {type: String},
    parentId: String
}, {timestamps: true})

module.exports = model("Category", CategorySchema);