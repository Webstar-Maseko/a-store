const category = require("../Models/category");
const product = require("../Models/product");
0;
exports.createProduct = (req, res) => {
 
  try {
    if (req.user.role === "admin") {
      let images = [];
      if (req.files.length > 0) {
        images = req.files.map((file) => {
          return { img: file.filename };
        });
      }

      const prod = new product({
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        description: req.body.description,
        size: req.body.size,
        offer: req.body.offer,
        images: images,
        addedBy: req.user._id,
        category: req.body.category,
      });
      prod.save((error, products) => {
        error ? res.send(error) : res.send(products);
      });
    } else {
      res.send("unauthorized");
    }
  } catch (err) {
    console.log(err);
  }
};

exports.getProduct = (req, res) => {
  product.find({}).exec((error, products) => {
    error ? res.send(error) : res.send(products);
  });
};

exports.deleteProduct = (req,res) =>{
  product.deleteOne({_id: req.body.id}, (err, success) =>{
    if (!err) {
      product.find({}).exec((error, products) => {
        if (error) res.send(error);
        else {
          res.send(products);
        }
      });
    } else {
      res.send(err);
    }
  })
}
