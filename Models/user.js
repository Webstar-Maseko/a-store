const {model, Schema} = require("mongoose");
const passportLocalMon= require("passport-local-mongoose");


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