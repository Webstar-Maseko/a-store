const User = require("../Models/user");
const passport = require("passport");

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.register = (req, res) =>{

    User.register({username: req.body.username, firstname: req.body.firstName, lastName: req.body.lastName, phone: req.body.phone,role:"user"}, req.body.password, (err, user)=> {
        if(!err){
            passport.authenticate("local") (req,res, () =>{
                console.log("User is registered");
                res.status(200).send(user);
            })
        }else{
            console.log("User is registered, but failing");
            res.status(400).send(err);
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
            if(user.role === "user"){
                passport.authenticate("local") (req,res, () =>{
                 User.findOne({username: user.username, role:"user"},(err, user)=>{
                    err ? res.send(err):
                    user !== null ? res.send(user): res.status(400).json({message:"User not found, please register an account"});
                })
            });
            }else{
                res.json({message:"Unauthorized, please register an account"})
            }
           
        }else{
            console.log(err)
            res.send(err);
           
        }
    })

}

exports.logout = (req, res) =>{
    req.logout();
    res.json({message:"You have logged out"})
}