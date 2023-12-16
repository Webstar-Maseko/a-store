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
 *              email:
 *                  type: string
 *                  required: true
 *                  
 */

const userSchema = new Schema({
    username:{
        type: String,
        unique:true,
        required: true
    },
    firstName: String,
    lastName: String,
    password: {
        type:String,
        match: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/,
        //required: [true, "Password is invalid, please ensure it contains at least 8 characters, a digit,a special character,and one uppercase letter"]
    }
        ,
    phone: String,
    role:{
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    email:{
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    }

}, {timestamps: true});
 
userSchema.set("toJSON",{
    transform:(doc,ret,options) =>{
        delete ret.hash
        delete ret.salt

        return ret;

    }
})
userSchema.plugin(passportLocalMon);
module.exports = model("User", userSchema);