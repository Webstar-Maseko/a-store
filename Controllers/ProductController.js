const slug = require("slug");
const shortid = require("shortid");
const Category = require("../Models/category");
const Product = require("../Models/product");

exports.createProduct = (req, res) => {
  try {
    if (req.user.role === "admin") {
      let images = [];
      if (req.files.length > 0) {
        images = req.files.map((file) => {
          return { img: file.filename };
        });
      }
      console.log(req.body.size.split(","));

      const prod = new Product({
        name: req.body.name,
        slug: slug(req.body.name + "-" + shortid.generate()),
        price: req.body.price,
        quantity: req.body.quantity,
        description: req.body.description,
        size: req.body.size.split(","),
        offer: req.body.offer,
        images: images,
        addedBy: req.user._id,
        category: req.body.category,
        color: req.body.color,
        sku: req.body.sku,
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

//Fetch all the products from the db
exports.getProduct = (req, res) => {
  Product.find({}).exec((error, products) => {
    error ? res.send(error) : res.send(products);
  });
};

//Get one product with it details
exports.getProductDetails = (req, res) => {
  try {
    const { product } = req.params;
    console.log(product);

    Product.findOne({ slug: product }).exec((error, prod) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.send(prod);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

//Delete one product from the db
exports.deleteProduct = (req, res) => {
  Product.deleteOne({ _id: req.body.id }, (err, success) => {
    if (!err) {
      Product.find({}).exec((error, products) => {
        if (error) res.send(error);
        else {
          res.send(products);
        }
      });
    } else {
      res.send(err);
    }
  });
};

//Get a list of products associated with a category from the db
exports.getCategoryProduct = (req, res) => {
  try {
    //Extract the category parameter from the request and store it in a variable
    const { root, sub, category } = req.params;

    //Find the category from the list of categories by name
    //Only return the _id since that is what is stored in the product documebt
    Category.findOne({ slug: root }, "_id").exec((error, categ) => {
      //Check if no error is returned from the find if there is, display it unless return alll the products for that category
      if (error) {
        res.status(400).json({ error });
      } else {
        //find the sub category
        Category.findOne({ parentId: categ._id, slug: sub }, "_id").exec(
          (err, cat) => {
            if (err) res.status(400).json({ err });
            else {
              //find the child category of the sub category
              Category.findOne(
                { parentId: cat._id, slug: category },
                "_id"
              ).exec((err, gory) => {
                if (err) {
                  res.status(400).json({ err });
                } else {
                  //return all the products associated with the child category
                  Product.find({ $and: [{ category: gory._id }] }).exec(
                    (err, products) => {
                      if (err) res.status(400).json({ err });
                      else {
                        res.json(products);
                      }
                    }
                  );
                }
              });
            }
          }
        );
      }
    });
  } catch (err) {
  
    res.send(err);
  }
};
