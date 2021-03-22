const {model, Schema} = require("mongoose");


const CategorySchema = new Schema({
    name: String,
    slug: {type: String,
    unique: true},
    parentId: String
}, {timestamps: true})

module.exports = model("Category", CategorySchema);