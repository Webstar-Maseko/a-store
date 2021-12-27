import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCategory from "./Modals/AddCategory";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  deleteCategories,
} from "../../../Redux/store/slicers/CategorySlicer";

const Category = (props) => {
  let [showModal, setShow] = useState(false);
  const dispatch = useDispatch();
  const cate = useSelector((state) => state.category);
  const { isLoggedIn } = useSelector((state) => state.adminUser);

  useEffect(() => {
    function check() {
      !isLoggedIn && props.history.push("/admin/login");
    }
    check();
  });

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  function renderCategories(cate) {
    let myCategories = [];
    for (let category of cate) {
      myCategories.push(
        <li key={category._id}>
          {category.name} |{" "}
          <button
            onClick={() => {
              let id = category._id;
              dispatch(deleteCategories(id));
            }}
          >
            <DeleteIcon />
          </button>
          {category.children.length > 0 ? (
            <ul>{renderCategories(category.children)}</ul>
          ) : null}
        </li>
      );
    }

    return myCategories;
  }

  return (
    <div className="">
      <h1>Category</h1>
      <div className="text-end">
        <Button onClick={() => setShow(true)}>Add Category</Button>
      </div>
      <AddCategory show={showModal} onHide={() => setShow(false)} />
      {cate !== undefined && renderCategories(cate)}
    </div>
  );
};

export default Category;
