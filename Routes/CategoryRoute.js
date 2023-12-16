const exp = require("express");
const {
  createCategory,
  getCategory,
  deleteCategory,
} = require("../Controllers/CategoryController");
const router = exp.Router();
const shortid = require("shortid");
const path = require("path");
const multer = require("multer");
const passport = require("passport");
const { verifyUser } = require("../Authentication/Authenticate");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./views/public/Category/images");
  },
  filename: (req, file, cb) => {
    cb(null, shortid.generate());
  },
});

const upload = multer({ storage: storage });

/**
 * @swagger
 * /category/create:
 *  post:
 *    tags:
 *      - Category
 *    summary: Used to create product categories
 *    description: Creates a new category. category can be a parent, a sub, a sub-sub category
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Category'
 *          example:
 *            name: Men
 *            parentId: null
 *
 *    responses:
 *      '200':
 *        description: "Category successfully created"
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              example: [{"_id":"","name":"Ladies","slug":"ladies","image":[{"_id":"","img":"7HYPo7wYn"}],"children":[]}]
 *      '401':
 *          description: Unauthorized
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example: {error:You are not logged in for this operation}
 *
 *      '500':
 *          description: internal server error
 */
router.post("/category/create",verifyUser ,upload.array("img"), createCategory);

/**
 * @swagger
 * /category/deleteCategory:
 *  delete:
 *    tags:
 *      - Category
 *    summary: used to delete a category or categories
 *    description: Delete categories from the db using the id, can delete multiple categories
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            example: [{'_id':"andad3d112"}]
 *    responses:
 *       '200':
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                example: [{"_id":"","name":"Ladies","slug":"ladies","image":[{"_id":"","img":"7HYPo7wYn"}],"children":[]}]
 *       '401':
 *          description: Unauthorized
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example: {error:You are not logged in for this operation}
 *
 *       '500':
 *          description: internal server error
 *
 *
 *
 *
 */
router.delete("/category/deleteCategory", verifyUser,deleteCategory);

/**
 * @swagger
 * /category/index:
 *  get:
 *    summary: Returns all categories in the db
 *    description: Used to retrieve all the categories in the database, formatted in parent and children structure
 *    tags:
 *      - Category
 *    responses:
 *      '200':
 *        description: Successfully retrieved all categories
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              example: [{"_id":"","name":"Ladies","slug":"ladies","image":[{"_id":"","img":"7HYPo7wYn"}],"children":[]}]
 *
 */
router.get("/category/index", getCategory);

module.exports = router;
