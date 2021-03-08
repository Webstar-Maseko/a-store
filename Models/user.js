const {model, Schema} = require("mongoose");
const passportLocalMon= require("passport-local-mongoose");


const userSchema = new Schema({
    username: String,
    firstName: String,
    lastName: String,
    Password: String,
    phone: Number

})
 
userSchema.plugin(passportLocalMon);
module.export = model("User", userSchema);