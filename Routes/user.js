const exp = require("express");
const { login, register,logout } = require("../Controllers/userController");
const router = exp.Router();



router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout)


module.exports =  router;