const User = require("../Models/user");
const passport = require("passport");

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.register = (req, res) => {
    try{
      if(req.body.username){
        if(req.body.password){
          User.register(
            {
              username: req.body.username,
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              phone: req.body.phone,
              role: "admin",
            },
            req.body.password,
            (err, user) => {
              if (!err) {
                passport.authenticate("local")(req, res, () => {
                  res.send({role: user.role,firstName:user.firstName,lastName:user.lastName});
                });
              } else {
                res.status(400).send(err);
              }
            }
          )
        }else{
          res.status(400).json({name:"MissingPasswordError", message:"Password is required"})
        }
      }else{
        res.status(400).json({name:"MissingUsernameError", message:"Missing username"});
      }
     
       
    }catch(error){
        res.status(500).send(error);
    }
  
};

exports.login = (req, res) => {
  if(req.body.username){
    let user = new User({
      username: req.body.username,
      password: req.body.password,
    });
  
    req.login(user, (err) => {
      if (!err) {
        passport.authenticate("local")(req, res, () => {
          User.findOne({ username: user.username }, (err, user) => {
            err ? res.send(err) : res.send({role: user.role,firstName:user.firstName,lastName:user.lastName});
          });
        });
      } else {
        res.status(401).send({message:"invalid username or password"});
      }
    });
  }else{
    res.status(400).send({message:"Username is required"})
  }
  
};
exports.restricted = (req, res) => {
  try {
    if (req.user) {
      if (req.user.role === "admin") {
        res
          .status(200)
          .send({ message: "access to restricted resource confirmed" });
      } else {
        res
          .status(403)
          .send({
            message: "You don't have the authority to access this resource",
          });
      }
    } else {
      res.status(401).send({ message: "Not authenticated for this resource" });
    }
  } catch (error) {
    res.send(500).json(error);
  }
};

exports.logout = (req, res) => {
  req.logout();
  res.json({ message: "You have logged out" });
};
