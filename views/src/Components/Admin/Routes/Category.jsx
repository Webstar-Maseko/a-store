
import axios from "axios";
import Table from "react-bootstrap/Table";
import { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { AuthContext } from "../../context/authContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Category = (props) => {
  let [cate, setCat] = useState([]);
  let { user, logout } = useContext(AuthContext);
  let { register, errors, handleSubmit } = useForm();

  { !user && props.history.push("/admin/login") }
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
      <Col md={4} ></Col>
      <Col md={4} ></Col>
      <Col md={4} >
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
          <br />
          <Button variant="dark" block type="submit">
            Add Category
          </Button>
        </Form>
      </Col>
    </Row>
   

     

      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Category</th>
            <th>Sub-categories</th>
          </tr>
        </thead>
        <tbody>
          {cate.length > 0 ? (
            cate.map((item, index) => (
              <tr>
                {" "}
                <td>{item.name}</td> <td>{item.children.length}</td>{" "}
                <td>
                  <Button
                    variant="dark "
                    onClick={() =>{
                    let id = item._id;
                      axios
                        .post("/api/category/deleteCategory", {id})
                        .then((res) => setCat(() => res.data))
                        .catch((err) => alert(err))
                    }}
                  >
                    Delete
                  </Button>
                </td>{" "}
              </tr>
            ))
          ) : (
            <td>No categories added</td>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default Category;
