const exp = require("express");
const { createCategory, getCategory, deleteCategory } = require("../Controllers/CategoryController");
const router = exp.Router();

router.post("/create", createCategory);
router.post("/deleteCategory", deleteCategory);
router.get("/index", getCategory);

module.exports = router;