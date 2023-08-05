const exp = require("express");
const { login, register,logout } = require("../Controllers/userController");
const router = exp.Router();



router.post("/user/register", register);
router.post("/user/login", login);
router.post("/user/logout", logout)


module.exports =  router;