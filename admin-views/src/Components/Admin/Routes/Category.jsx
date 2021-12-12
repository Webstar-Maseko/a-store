import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import { AuthContext } from "../../context/authContext";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCategory from "./Modals/AddCategory";

const Category = (props) => {
  let [cate, setCat] = useState([]);
  let { user, logout } = useContext(AuthContext);
  let { register, errors, handleSubmit } = useForm();
  let [showModal, setShow] = useState(false);

  function setCategory() {
    axios
      .get("/api/category/index")
      .then((res) => setCat((x) => res.data))
      .catch((error) => alert(error));
  }
  useEffect(() => {
    function check() {
      !user && props.history.push("/admin/login");
    }
    check();
  });
  useEffect(setCategory, []);
  function onSubmit(data) {
    axios
      .post("/api/category/create", data)
      .then((res) => "")
      .catch((error) => alert(error));
    setCategory();
  }

  function renderCategories(cate) {
    let myCategories = [];
    for (let category of cate) {
      myCategories.push(
        <li key={category._id}>
          {category.name} |{" "}
          <button
            onClick={() => {
              let id = category._id;
              axios
                .post("/api/category/deleteCategory", { id })
                .then((res) => setCat(() => res.data))
                .catch((err) => alert(err));
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
  function renderCategoriesOption(cate) {
    let myOptGroup = [];
    console.log(cate);
    for (let category of cate) {
      myOptGroup.push(
        <>
          <option value={category._id}>{category.name} </option>
          {category.children.length > 0 ? (
            <optgroup label={category.name}>
              {renderCategoriesOption(category.children)}
            </optgroup>
          ) : null}
        </>
      );
    }
    return myOptGroup;
  }

  return (
    <div className="pt-5">
      <h1>Category</h1>
      <div className="text-right">
        <Button onClick={() => setShow(true)}>Add Category</Button>
      </div>
      <AddCategory show={showModal} onHide={() => setShow(false)} />
      {renderCategories(cate)}
      {/* <ul>
            {cate.length > 0 &&
              cate.map((item, index) => (
                <li key={item._id}>
                  <h5>
                    {item.name} |{" "}
                    <button
                      onClick={() => {
                        let id = item._id;
                        axios
                          .post("/api/category/deleteCategory", { id })
                          .then((res) => setCat(() => res.data))
                          .catch((err) => alert(err));
                      }}
                    >
                      <DeleteIcon />
                    </button>
                  </h5>
                  {item.children.length > 0 &&
                    item.children.map((child, i) => (
                      <ul>
                        <li key={child._id}>
                          {child.name}{" "}
                          <button
                            onClick={() => {
                              let id = child._id;
                              axios
                                .post("/api/category/deleteCategory", { id })
                                .then((res) => setCat(() => res.data))
                                .catch((err) => alert(err));
                            }}
                          >
                            <DeleteIcon />
                          </button>
                        </li>
                      </ul>
                    ))}
                </li>
              ))}
          </ul> */}
  
    </div>
  );
};

export default Category;
