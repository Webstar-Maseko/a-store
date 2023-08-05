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
