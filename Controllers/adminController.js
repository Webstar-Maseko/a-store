const { getToken } = require("../Authentication/Authenticate");
const { tokenSpan } = require("../Constants/Constants");
const User = require("../Models/user");
const passport = require("passport");

exports.register = (req, res) => {
  try {

    if(req.body.email){
      User.findOne({email:req.body.email}).then((user) =>{
          if(user != null)
            res.status(400).json({name:"UserExistsError",message: "User with the specified email has already been registered. Please log in."})
          else{
            if (req.body.username) {
              if (req.body.password) {
                User.register(
                  {
                    username: req.body.username,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    phone: req.body.phone,
                    email: req.body.email,
                    role: "admin",
                  },
                  req.body.password,
                  (err, user) => {
                    if (!err) {
                      const access_token = getToken({ _id: user._id });
                      res.status(200).send({ success: true, access_token, expiresIn:tokenSpan });
                    } else {
                      if(err.name === "ValidationError"){
                        const validationErrors = Object.values(err.errors).map((err) => err.message);
                        res.status(400).json({ errors: validationErrors });
                      }else if(err.code === 11000){
                        res.status(400).json({message: "User with the specified email has already been registered. Please log in."})
                      }
                      else{
                        res.status(400).send(err);
                      }
                      
                    }
                  }
                );
              } else {
                res
                  .status(400)
                  .json({
                    name: "MissingPasswordError",
                    message: "Password is required",
                  });
              }
            } else {
              res
                .status(400)
                .json({ name: "MissingUsernameError", message: "Missing username" });
            }
          }
        }
      ).catch(error =>{
        res.status(400).send({error});
      })
    }else{
      res.status(400).json({message:"Email is required."})
    }

  } catch (error) {
    if(error.name === "ValidationError"){
      const validationErrors = Object.values(error.errors).map((err) => err.message);
      res.status(400).json({ errors: validationErrors });
    }else{
      res.status(500).send(error);
    }
    
  }
};

exports.login = (req, res) => {
  if (req.body.username) {
    if (req.user) {
      const access_token = getToken({ _id: req.user._id });
      res
        .status(200)
        .send({ success: true, access_token, expiresIn: tokenSpan });
    } else {
      res.status(401).send({ message: "invalid username or password" });
    }
  } else {
    res.status(400).send({ message: "Username is required" });
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
        res.status(403).send({
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


