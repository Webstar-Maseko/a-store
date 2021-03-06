const User = require("../Models/user");
const passport = require("passport");

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.register = (req, res) =>{
    User.register({username: req.body.username, firstname: req.body.firstName, lastName: req.body.lastName, phone: req.body.phone}, req.body.password, (err, user)=> {
        if(!err){
            passport.authenticate("local") (req,res, () =>{
                res.send(user);
            })
        }else{
            res.send(err);
        }
    })

}

exports.login = (req, res) =>{
    let user = new User({
        username: req.body.username,
        password: req.body.password
    });
   

    req.login(user, (err) =>{
        if(!err){
            passport.authenticate("local") (req,res, () =>{
                res.send(user);
            });
        }else{
            res.send(err);
        }
    })

}