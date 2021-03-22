const exp = require("express");
const { login, register } = require("../Controllers/adminController");
const router = exp.Router();



router.post("/register", register);
router.post("/login", login);

module.exports =  router;