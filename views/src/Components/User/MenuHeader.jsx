import axios from "axios";
import { useEffect, useState } from "react";

const MenuHeader = () => {
  let [category, setCategory] = useState([]);
  let [show, setShow] = useState(false);

  function scrollNav() {
    let scrollNow = window.scrollY;
    setShow(window.scrollY >= this.lastScroll ? true : false);

    this.lastScroll = scrollNow;
  }

  function getCategory() {
    axios
      .get("api/category/index")
      .then((res) => setCategory(res.data))
      .catch((err) => alert(err));

  
  }
  useEffect(getCategory, []);
  useEffect(() => {
    window.addEventListener("scroll", scrollNav);
    return () => {
      window.removeEventListener("scroll", scrollNav);
    };
  }, []);

  function filt(cate) {
    let name = null;
    for (let cat of category) {
      if (cat._id === cate.parentId) name = cat.name;
    }
    return name;
  }
  function renderCategories(cate) {
    let myCategories = [];
    for (let category of cate) {
      let tempName = filt(category);
      myCategories.push(
        <li key={category._id}>
          {category.parentId ? (
            <a href={`${tempName}/${category.name}`}> {category.name} </a>
          ) : (
            <a href={category.name} className="span">
              {category.name}
            </a>
          )}

          {category.children.length > 0 ? (
            <ul>{renderCategories(category.children)}</ul>
          ) : null}
        </li>
      );
    }

    return myCategories;
  }

  return (
    <div className={`menuHeader ${show && "d-none"} `}>
      <ul> {renderCategories(category)} </ul>
    </div>
  );
};

export default MenuHeader;
