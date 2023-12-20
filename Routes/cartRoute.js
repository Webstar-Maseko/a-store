const exp = require("express");
const { addItem, getCart } = require("../Controllers/cartController");
const { verifyUser } = require("../Authentication/Authenticate");
const router = exp.Router();


router.post("/cart/addItem",verifyUser, addItem );
router.get("/cart/index",verifyUser,getCart)
module.exports = router;