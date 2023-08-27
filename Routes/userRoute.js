const exp = require("express");
const { login, register,logout, userDetails } = require("../Controllers/userController");
const passport = require("passport");
const { verifyUser } = require("../Authentication/Authenticate");
const router = exp.Router();

/**
 * @swagger
 * /user/register:
 *  post:
 *      summary: register a new customer
 *      description: used to register a new customer that will have the ability of buying on the platform
 *      tags:
 *          - User
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *                  example:
 *                      firstName: Ace
 *                      lastName: Sorenstein
 *                      username: user@mail.com
 *                      password: string
 *                      phone: 0123456789
 *                      email: webstar@gmail.com
 *      responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '400':
 *              description: Bad Request
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example: '{"message":"User already registered"}'
 *      
 * 
 */

router.post("/user/register", register);

/**
 * @swagger
 * /user/login:
 *  post:
 *      summary: authenticates a customer
 *      description: Used to verify the existence of a customer
 *      tags:
 *          - User
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      example: {'username':'siya','password':'pwd'}
 *      responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example: {'success':true,'access_token':'some long string','expiresIn':1h}
 *          '400':  
 *              desctiption: Bad request
 *      
 *                          
 *          
 * 
 */
router.post("/user/login",passport.authenticate("local",{session:false}), login);

/**
 * @swagger
 * /user/userDetails:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: used to retrieve authenticated user's details
 *    tags:
 *      - User
 *    responses:
 *      '200':
 *        description: 'OK'
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example: {'firstName':"Siya"}
 *      '401':
 *        description: 'Not Authorized'
 * 
 */
router.get("/user/userDetails",verifyUser,userDetails);


module.exports =  router;