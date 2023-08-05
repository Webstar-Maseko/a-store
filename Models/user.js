const {model, Schema} = require("mongoose");
const passportLocalMon= require("passport-local-mongoose");

/**
 * @openapi
 * components:
 *  schemas:
 *      User:
 *          properties:
 *              username:
 *                  type: string
 *                  required: true
 *              firstname:
 *                  type: string
 *                  required: true
 *              lastname: 
 *                  type: string
 *                  required: true
 *              password:
 *                  type: string
 *                  required: true
 *              role:
 *                  type: string
 *                  default: 'user'
 *              phone: 
 *                  type: string
 *                  
 */

const userSchema = new Schema({
    username: String,
    firstName: String,
    lastName: String,
    Password: String,
    phone: String,
    role:{
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    } 

}, {timestamps: true});
 
userSchema.plugin(passportLocalMon);
module.exports = model("User", userSchema);