const { tokenSpan } = require("../Constants/Constants");

const passport = require("passport");
const jwt = require("jsonwebtoken");

exports.getToken = user =>{
    console.log(tokenSpan)
    return jwt.sign(user,process.env.jwt_secret,{
        expiresIn:tokenSpan
    })
}

const authenticate = (req,res,next) =>{
    passport.authenticate("jwt",{session:false}, (err,user,info) =>{
        if(err)
            return next(err);
        if(!user)
        {
            res.status(401).send({message:"You are not authenticated for this request"});
        }else{
            req.user = user;
            next();
        }
        
    })(req,res,next)
}
exports.verifyUser = authenticate;