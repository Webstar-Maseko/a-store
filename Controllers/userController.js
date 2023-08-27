const { getToken } = require("../Authentication/Authenticate");
const { tokenSpan } = require("../Constants/Constants");
const User = require("../Models/user");

exports.register = (req, res) => {
    try{
        User.register(
            {
              username: req.body.username,
              firstname: req.body.firstName,
              lastName: req.body.lastName,
              phone: req.body.phone,
              role: "user",
            },
            req.body.password,
            (err, user) => {
              if (!err) {
                const access_token = getToken({_id:user._id});
                res.status(200).send({success:true, access_token,expiresIn:tokenSpan});
            
              } else {
                res.status(400).send(err);
              }
            }
          );
    }catch(error){
        res.status(500).send(error)
    }
 
};

exports.login = (req, res) => {
 try{
    if (req.body.username) {
        if (req.user.role =="user") {
          const access_token = getToken({ _id: req.user._id });
          res
            .status(200)
            .send({ success: true, access_token, expiresIn: tokenSpan });
        } else {
          res.status(401).send({ message: "unauthorzed please register an account" });
        }
      } else {
        res.status(400).send({ message: "Username is required" });
      }
 }catch(error){
    res.status(500).send(error);
 }
  
};

exports.userDetails = (req,res) =>{
    try{
      if(req.user){
        res.status(200).json(req.user);
  
      }else{
        res.status(401).send({message:"You are not authenticated for this action"})
      }
  
    }catch(err){
      res.status(500).json(err);
    }
  }

exports.logout = (req, res) => {
  req.logout();
  res.json({ message: "You have logged out" });
};
