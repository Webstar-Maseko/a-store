const exp = require("express");
const { addItem } = require("../Controllers/cartController");
const router = exp.Router();


router.post("/cart/addItem", addItem );
module.exports = router;