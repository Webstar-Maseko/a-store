const { model, Schema } = require("mongoose");

/**
 * @swagger
 * components:
 *  schemas:
 *    Category:
 *      properties:
 *        name:
 *          type: string
 *          required: true
 *          description: name of the category
 *        parentId:
 *          type: string
 *          required: false
 *          description: Determines if category is a parent or sub, if left blank means it is parent category
 *          default: null
 *        image:
 *          type: array
 *          required: true
 *          items:
 *            type: object
 *            required: true
 *            properties:
 *              img:
 *                type: string
 *                required: true
 *            
 */
const CategorySchema = new Schema(
  {
    name: {
      type:String,
      minlength:3,
      maxlength: 80},
    slug: { type: String },
    parentId: Schema.Types.ObjectId,
    image: [ {
        img : {type: String, required: true}

    }]
  },
  { timestamps: true }
);

module.exports = model("Category", CategorySchema);
