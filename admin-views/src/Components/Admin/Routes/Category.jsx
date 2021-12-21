import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import { AuthContext } from "../../context/authContext";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCategory from "./Modals/AddCategory";
import {useDispatch, useSelector} from "react-redux"
import { getCategories, deleteCategories} from "../../../Redux/store/slicers/CategorySlicer";
const Category = (props) => {
  //let [cate, setCat] = useState([]);
  let { user, logout } = useContext(AuthContext);
  let { register, errors, handleSubmit } = useForm();
  let [showModal, setShow] = useState(false);
  const dispatch =useDispatch();
  const cate = useSelector(state => state.category)

  useEffect(() => {
    function check() {
      !user && props.history.push("/admin/login");
    }
    check();
  });


  useEffect(() =>{
    dispatch(getCategories())
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
             dispatch(deleteCategories(id))
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
      {renderCategories(cate)}
    </div>
  );
};

export default Category;
