const { tokenSpan } = require("../Constants/Constants");

const passport = require("passport");
const jwt = require("jsonwebtoken");

exports.getToken = user =>{
    console.log(tokenSpan)
    return jwt.sign(user,process.env.jwt_secret,{
        expiresIn:tokenSpan
    })
}

exports.verifyUser = passport.authenticate("jwt",{session:false});