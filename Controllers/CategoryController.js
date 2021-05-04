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
      name: c.name,
      slug: c.slug,
      children: createCateList(categories, c._id),
    });
  }
  return catList;
};

exports.createCategory = (req, res) => {
  if (req.user.role === "admin") {
    console.log(req.body);
    const cateG = {
      name: req.body.gory,
      slug: slugify(req.body.gory),
    };
    if (req.body.parentId) { 
      cateG.parentId = req.body.parentId;
    }

    const cat = new category(cateG);
    cat.save((err, categ) => {
      if (err) res.send(err);
      else res.send(categ);
    });
  } else {
    res.send(req.user);
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
  
  category.deleteMany(
    { $or: [{ _id: req.body.id }, { parentId: req.body.id }] },
    (err, docs) => {
      console.log(err);
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
};
