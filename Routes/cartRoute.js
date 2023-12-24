const exp = require("express");
const { addItem, getCart, removeItem } = require("../Controllers/cartController");
const { verifyUser } = require("../Authentication/Authenticate");
const router = exp.Router();

/**
 * @swagger
 * /cart/addItem:
 *  post:
 *      security:
 *          - bearerAuth: []
 *      summary: add a new or updates an entry in the cart
 *      description: Used to add a new item to the cart. if the item being added already exists it quantity will be updated.
 *      tags:
 *          - Cart
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/Cart'
 *      responses:
 *          '200':
 *              description: Ok
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example: {}
 *          '401':
 *              description: Unauthorized
 *          '400':
 *              description: bad request
 *              
 */
router.post("/cart/addItem",verifyUser, addItem );

/**
 * @swagger
 * /cart/index:
 *  get:
 *      tags:
 *          - Cart
 *      security:
 *          - bearerAuth: []
 *      summary: retrieve cart for authenticated user
 *      description: used to retrieve cart items for the authenticated user
 *      responses:
 *          '200':
 *              description: OK
 *          '500':
 *              description: Internal server error
 */
router.get("/cart/index",verifyUser,getCart)

/**
 * @swagger
 * /cart/deleteItem/{productId}:
 *  delete:
 *      security:
 *          - bearerAuth: []
 *      summary: removes an entry from the cart. if the item's quantity is greater than 0, the items's quantity will be increased by 1. if it is below, the item will be completely removed.
 *      description: removes an entry from the cart. if the item's quantity is greater than 0, the items's quantity will be increased by 1. if it is below, the item will be completely removed.
 *      tags:
 *          - Cart
 *      parameters:
 *          - name: productId
 *            description: the product id that you wish 
 *            in: path
 *            required: true
 *      responses:
 *          '204':
 *              description: OK
 *          '400':
 *              description: Bad request
 *  
 * 
 * 
 */
router.delete("/cart/deleteItem/:productId", verifyUser,removeItem)
module.exports = router;