const slug = require("slug");
const { findByIdAndDelete } = require("../Models/category");
const category = require("../Models/category");
const ValidationError = require("../Utils/ValidationError");

//Create arrays of category nest them by parents
createCateList = (categories, parent_id = null) => {
  const catList = [];
  let cat;
  //Create an outer parent/root
  if (parent_id === null) {
    cat = categories.filter((x) => JSON.stringify(x.parentId) == undefined);
  }
  //Create a child of a parent
  else {
    console.log(categories.map(x => x))
    cat = categories.filter((x) => JSON.stringify(x.parentId) == JSON.stringify(parent_id));
    
  }

  for (let c of cat) {
    catList.push({
      _id: c._id,
      parentId: c.parentId,
      name: c.name,
      slug: c.slug,
      image: c.image,
      children: createCateList(categories, c._id),
    });
  }
  return catList;
};

//create a category
exports.createCategory = async (req, res) => {
  try {
    if (req.user != undefined) {
      if (req.user.role === "admin") {
        let images = [];
        if (req.files) {
          if (req.files.length > 0) {
            images = req.files.map((file) => {
              return { img: file.filename };
            });
          }
        }

        const cateG = {
          name: req.body.name,
          slug: slug(req.body.name),
          image: images,
          parentId : req.body.parentId == null ? null : await category.findOne({_id:req.body.parentId}).then(category => category ? req.body.parentId : null).catch(err => null)
        };

      
        const cat = new category(cateG);
        cat
          .save()
          .then((categ) => {
           
            category
              .find({})
              .then((categories) => {
                const catList = createCateList(categories);
                res.status(200).send(catList);
              })
              .catch((error) => res.status(400).send(error));
          })
          .catch((err) => {

            if(err.name == "ValidationError"){
              ValidationError(err, res);
            }else{
              res.status(400).json(err)
            }
            
          
          });
      } else {
        res
          .status(403)
          .send({ error: "You are not authorized to perfom this action" });
      }
    } else {
      res.status(401).json({ error: "You are not logged in" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.getCategory = (req, res) => {
  category
    .find({})
    .then((categories) => {
      const catList = createCateList(categories);
      res.send(catList);
    })
    .catch((error) => res.send(error));
};

exports.deleteCategory = (req, res) => {
  try {
    if (req.user.role === "admin") {
      let collection = req.body;
      if (!Array.isArray(collection))
        return res.status(400).send({ message: "invalid body" });
      else{
        category.deleteMany({ _id: { $in: collection } }).then(docs => {
          category
            .find({})
            .then((categories) => {
              const catList = createCateList(categories);
              res.status(200).send(catList);
            })
            .catch((error) => res.status(400).json({ error }));
        }).catch(err => res.status(400).json(err));
      }
      
     
    } else {
      res
        .status(403)
        .json({ message: "You don't have permission for this action" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
