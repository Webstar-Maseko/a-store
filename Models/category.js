const { model, Schema } = require("mongoose");

const CategorySchema = new Schema(
  {
    name: String,
    slug: { type: String },
    parentId: String,
    image: [ {
        img : {type: String, required: true}

    }]
  },
  { timestamps: true }
);

module.exports = model("Category", CategorySchema);
