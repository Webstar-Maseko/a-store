import axios from "axios";
import Table from "react-bootstrap/Table";
import { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { AuthContext } from "../../context/authContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DeleteIcon from "@material-ui/icons/Delete";

const Category = (props) => {
  let [cate, setCat] = useState([]);
  let { user, logout } = useContext(AuthContext);
  let { register, errors, handleSubmit } = useForm();

  {
    !user && props.history.push("/admin/login");
  }
  function setCategory() {
    axios
      .get("/api/category/index")
      .then((res) => setCat((x) => res.data))
      .catch((error) => alert(error));
  }
  useEffect(setCategory, []);
  function onSubmit(data) {
    axios
      .post("/api/category/create", data)
      .then((res) => "")
      .catch((error) => alert(error));
    setCategory();
  }

  return (
    <div className="pt-5">
      <Row>
        <Col md={4}>
          <h1>Category</h1>
          <ul>
            {cate.length > 0 &&
              cate.map((item, index) => (
                <li key={item._id}>
                  <h5>{item.name} | <button
                            onClick={() => {
                              let id = item._id;
                              axios
                                .post("/api/category/deleteCategory", { id })
                                .then((res) => setCat(() => res.data))
                                .catch((err) => alert(err));
                            }}
                          >
                            <DeleteIcon />
                          </button></h5>   
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
          </ul>
        </Col>
        <Col md={4}></Col>

        <Col md={4}>
          <Form onSubmit={handleSubmit(onSubmit)} className=" pb-5">
            <Form.Control
              className=""
              type="text"
              name="gory"
              placeholder="Category name"
              ref={register({ required: true })}
            />
            {errors.gory && (
              <span className="text-danger">Category name cannot be null </span>
            )}
            <Form.Control
              as="select"
              name="parentId"
              ref={register({ required: false })}
            >
              <option value="">Select category to create sub</option>
              {cate.length > 0
                ? cate.map((item, index) => (
                    <option value={item._id}>{item.name}</option>
                  ))
                : ""}
            </Form.Control>
            <br />
            <Button variant="dark" block type="submit">
              Add Category
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Category;
