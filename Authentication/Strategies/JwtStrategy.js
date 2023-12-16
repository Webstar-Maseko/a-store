const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const User = require("../../Models/user");
const { ExtractJwt } = require("passport-jwt");
const {tokenSpan} = require("../../Constants/Constants");

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.jwt_secret,
    jsonWebTokenOptions:{
        expiresIn: tokenSpan,

    }
}

passport.use(new JWTStrategy(jwtOptions,(payload,done) =>{
    User.findOne({_id:payload._id}).then((user) =>{
        if(user)
            return done(null,user);
        else
            return done(null,false);
    }).catch(error =>{
        return done(error,false);
    })
}))