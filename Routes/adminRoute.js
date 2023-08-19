const exp = require("express");
const {
  login,
  register,
  logout,
  restricted,
  userDetails,
} = require("../Controllers/adminController");
const { verifyUser } = require("../Authentication/Authenticate");
const router = exp.Router();
const passport = require("passport");

/**
 * @swagger
 * tags:
 *  - name: Admin
 *    description: Used for authorization and authentication in the backend
 */
/**
 * @swagger
 * /admin/register:
 *  post:
 *      summary: register a new admin user
 *      description: adds a new user with admin priviledges
 *      tags:
 *          - Admin
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
 *      responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          '400':
 *              description: Bad Request
 *
 *
 */
router.post("/admin/register", register);

/**
 * @swagger
 * /admin/login:
 *  post:
 *      summary: Authenticates user for perfoming db operations
 *      description: requred to manage the store
 *      tags:
 *          - Admin
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      example: {'username':'siya', 'password':'pwd'}
 *      responses:
 *          '200':
 *              description: OK
 *          '400':
 *              description: Bad request
 */
router.post("/admin/login",passport.authenticate("local",{session:false}), login);

/**
 * @swagger
 * /admin/logout:
 *  post:
 *      summary: logs out the user
 *      description: Used to destriy the current user session and de-authenticate the user
 *      tags:
 *          - Admin
 *      responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example: {'message':"you have logged out"}
 */

router.post("/admin/logout", logout);

/**
 * @swagger
 * /restricted:
 *  get:
 *      summary: testing restricted resource (temporarily)
 *      tags:
 *         - Admin
 *      responses:
 *          '200':
 *              description: Ok
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example: {'message':"access to restricted resource confirmed"}
 *          '403':
 *              description: forbidden
 *          '401':
 *              description: Not authorized
 *          '500':
 *              description: internal server error
 */
router.get("/restricted",verifyUser, restricted);

/**
 * @swagger
 * /admin/userDetails:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: used to retrieve authenticated user's details
 *    tags:
 *      - Admin
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
router.get("/admin/userDetails",verifyUser,userDetails);

module.exports = router;
