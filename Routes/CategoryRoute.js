const exp = require("express");
const { createCategory, getCategory } = require("../Controllers/CategoryController");
const router = exp.Router();

router.post("/create", createCategory)
router.get("/index", getCategory);

module.exports = router;