const exp = require("express");
const { getProduct, createProduct } = require("../Controllers/ProductController");
const router = exp.Router();
const shortid = require('shortid');
const path = require('path');
const multer = require('multer');


const storage =  multer.diskStorage({
    destination: (req,file, cb) =>{
        cb(null, "./uploads")
    },
    filename: (req,file, cb) =>{
        cb(null, shortid.generate() + "-" + file.originalname)
    }
})

const upload = multer({storage: storage});


router.get("/getProduct", getProduct)
router.post("/create",upload.array("img"), createProduct)

module.exports = router;