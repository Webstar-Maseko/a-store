const slug = require("slug");
const { findByIdAndDelete } = require("../Models/category");
const category = require("../Models/category");


//Create arrays of category nest them by parents
createCateList = (categories, parent_id = null) => {
  const catList = [];
  let cat;
  //Create an outer parent/root
  if (parent_id === null) {
    cat = categories.filter((x) => x.parentId == undefined);
  } 
  //Create a child of a parent
  else {
    cat = categories.filter((x) => x.parentId == parent_id);
  }

  for (let c of cat) {
    catList.push({
      _id: c._id,
      parentId: c.parentId,
      name: c.name,
      slug:c.slug,
      image: c.image,
      children: createCateList(categories, c._id),
    });
  }
  return catList;
};


//create a category
exports.createCategory = (req, res) => {

  if(req.user != undefined){
    if (req.user.role === "admin") {

      let images = [];
      if (req.files.length > 0) {
        images = req.files.map((file) => {
          return { img: file.filename };
        });
      }

      const cateG = {
        name: req.body.gory,
        slug:slug(req.body.gory),
        image:images
      };

      if (req.body.parentId != "") {
        cateG.parentId = req.body.parentId;
      }
  
      const cat = new category(cateG);


      cat.save((err, categ) => {
        if (err) res.send(err);
        else {
          category.find({}).exec((error, categories) => {
            if (error) res.send(error);
            else {
              const catList = createCateList(categories);
              res.send(catList);
            }
          });
        }
      });
    } else {
      res.status(401).send({error:"You are not authorized to perfom this action"});
    }
  }else{
    
    res.status(401).json({error: "You are not logged in"});
  }
 
};

exports.getCategory = (req, res) => {
  category.find({}).exec((error, categories) => {
    if (error) res.send(error);
    else {
      const catList = createCateList(categories);

      res.send(catList);
    }
  });
};

exports.deleteCategory = (req, res) => {

  try {
    if(req.user !== undefined){
      if(req.user.role === "admin"){
  
        let collection = req.body;

        category.deleteMany(
          { _id: {$in: collection} },
          (err, docs) => {
            if (!err) {
              category.find({}).exec((error, categories) => {
                if (error) res.send(error);
                else {
                  const catList = createCateList(categories);
                  res.send(catList);
                }
              });
            } else {
              res.send(err);
            }
          }
        );
      }else{
        res.status(401).json({error:"You don't have permission for this action"})
      }
     
    }else{
      res.status(401).json({error: "You are not logged in"});
    }
   
  } catch (error) {
    res.status(500).send(error)
  }
  
};
