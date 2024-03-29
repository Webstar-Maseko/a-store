const exp = require("express");
const {
  getProduct,
  createProduct,
  deleteProduct,
  getCategoryProduct,
  getProductDetails
} = require("../Controllers/ProductController");
const router = exp.Router();
const shortid = require("shortid");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./views/public/assets/images");
  },
  filename: (req, file, cb) => {
    cb(null, shortid.generate());
  },
});

const upload = multer({ storage: storage });
/**
 * @swagger
 * /product/getProduct:
 *  get:
 *      summary: retrieves all products from the database
 *      description: retrieves all available products
 *      tags:
 *        - Product
 *      responses:
 *        '200':
 *           description: OK
 *           content: 
 *              application/json:
 *                schema: 
 *                  type: array
 *                  examples: [{"size":["S","M","L"],"_id":"6293a66fe0a82b9264dfbd41","name":"Oakridge Formal","slug":"oakridge-formal-c3mch2igo0","price":149.99,"quantity":10,"description":"adasdcscs svdsv","images":[{"_id":"6293a66fe0a82b9264dfbd42","img":"st9NNyIre"},{"_id":"6293a66fe0a82b9264dfbd43","img":"XVN3gjq7c3"}],"addedBy":"61b49a592f602ec080076c92","category":"62373585e2142630fc9f5812","color":"blue","sku":"12345678","reviews":[],"createdAt":"2022-05-29T16:59:27.147Z","updatedAt":"2022-05-29T16:59:27.147Z","__v":0}]
 *          
 *  
 */
router.get("/product/getProduct", getProduct);

/**
 * @swagger
 * /product/{product}:
 *  get:
 *    summary: retrieves specified product details
 *    description: returns all information for specified product
 *    tags:
 *      - Product
 *    parameters:
 *      - name: product
 *        in: path
 *        description: slug name for product
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example: {"size":["S","M","L"],"_id":"6293a66fe0a82b9264dfbd41","name":"Oakridge Formal","slug":"oakridge-formal-c3mch2igo0","price":149.99,"quantity":10,"description":"adasdcscs svdsv","images":[{"_id":"6293a66fe0a82b9264dfbd42","img":"st9NNyIre"},{"_id":"6293a66fe0a82b9264dfbd43","img":"XVN3gjq7c3"}],"addedBy":"61b49a592f602ec080076c92","category":"62373585e2142630fc9f5812","color":"blue","sku":"12345678","reviews":[],"createdAt":"2022-05-29T16:59:27.147Z","updatedAt":"2022-05-29T16:59:27.147Z","__v":0}
 *      '404':
 *        description: Not found
 *              
 */
router.get("/product/:product", getProductDetails);

/**
 * @swagger
 * /product/{root}/{sub}/{category}:
 *  get:
 *    summary: returns a filtered list of product for specifed category
 *    description: requries a parent, a child and finally the grandchild, to return products related to the grandchild
 *    tags:
 *      - Product
 *    parameters:
 *      - name: root
 *        in: path
 *        description: this is the parent category e.g Men
 *        required: true
 *      - name: sub
 *        in: path
 *        description: sub category of the parent. e.g Accessories
 *        required: tru
 *      - name: category
 *        in: path
 *        description: this is the sub sub category. e.g socks
 *        required: true
 *    responses:
 *      '200':
 *        description: OK
 *        content:
 *          application/json:
 *                schema:
 *                  type: array
 *                  example: [{}]
 *      '404':
 *        description: Not found
 *        
 *        
 *      
 */
router.get("/product/:root/:sub/:category", getCategoryProduct);

/**
 * @swagger
 * /product/create:
 *  post:
 *    summary: adds a new product
 *    description: adds a new new product under a category
 *    tags:
 *      - Product
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Product'
 *    responses:
 *      '200':
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example: {}
 *      '401':
 *          description: Not Authorized for this action
 *      '500':
 *         description: internal server error
 * 
 */
router.post("/product/create", upload.array("img"), createProduct);

/**
 * @swagger
 * /product/delete/{id}:
 *  delete:
 *    summary: deletes a product
 *    description: deletes a product
 *    tags:
 *      - Product
 *    parameters:
 *      - name: id
 *        description: product id
 *        in: path
 *        required: true
 *    responses:
 *      '204':
 *        description: Successfully deleted
 *      '403':
 *        description: forbidden
 *      '500':
 *        description: internal server error
 *        
 *              
 *      
 */
router.delete("/product/delete/:id", deleteProduct);


module.exports = router;
