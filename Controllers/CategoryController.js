const slugify = require("slugify");
const category = require("../Models/category");

createCateList = (categories, parent_id = null) => {
  const catList = [];
  let cat;
  if (parent_id === null) {
    cat = categories.filter((x) => x.parentId == undefined);
  } else {
    cat = categories.filter((x) => x.parentId == parent_id);
  }
  for (let c of cat) {
    catList.push({
      _id: c._id,
      parentId: c.parentId,
      name: c.name,
      image: c.image,
      children: createCateList(categories, c._id),
    });
  }
  return catList;
};

exports.createCategory = (req, res) => {
  if(req.user != undefined){
    if (req.user.role === "admin") {
      const cateG = {
        name: req.body.gory,
      };
      if(req.file != undefined){
        cateG.image =  req.file.filename;
      }
      if (req.body.parentId != "") {
        cateG.parentId = req.body.parentId;
      } else {
        cateG.slug = slugify(req.body.gory);
      }
  
      const cat = new category(cateG);
      cat.save((err, categ) => {
        if (err) res.send(err);
        else res.send(categ);
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
  if(req.user !== undefined){
    if(req.user.role === "admin"){
      category.deleteMany(
        { $or: [{ _id: req.body.id }, { parentId: req.body.id }] },
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
 
};
