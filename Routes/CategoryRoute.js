const exp = require("express");
const {
  createCategory,
  getCategory,
  deleteCategory,
} = require("../Controllers/CategoryController");
const router = exp.Router();
const shortid = require("shortid");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./views/public/Category/images");
  },
  filename: (req, file, cb) => {
    cb(null, shortid.generate());
  },
});

const upload = multer({ storage: storage });

router.post("/create", upload.single("img"), createCategory);
router.post("/deleteCategory", deleteCategory);
router.get("/index", getCategory);

module.exports = router;
