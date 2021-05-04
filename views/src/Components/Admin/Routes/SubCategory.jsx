import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import Table from "react-bootstrap/Table";

const SubCategory = () => {
  let { register, handleSubmit, errors } = useForm();
  let [category, setCategory] = useState([]);
  function getCategory() {
    axios
      .get("/api/category/index")
      .then((res) => setCategory(() => res.data))
      .catch((err) => alert(err));
  }
  function clearControl() {
    console.log(document.getElementsByName("gory").value);
   
  }
  useEffect(getCategory, []);
  function onSubmit(data) {

      console.log(data);
    axios
      .post("api/category/create", data)
      .then((res) => getCategory() )
      .catch((err) => alert(err));
  }

  return (
    <div>
      <Row>
        <Col md={4}></Col>
        <Col md={4}></Col>
        <Col md={4}>
          <h3>Add sub Category</h3>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              name="parentId"
              ref={register({ required: true })}
            >
              {category.length > 0
                ? category.map((item, index) => (
                    <option value={item._id}>{item.name}</option>
                  ))
                : ""}
            </Form.Control>
            <Form.Control
              name="gory"
              placeholder="sub-category name"
              ref={register({ required: true })}
            />
            <br />
            <Button type="submit" className="bg-dark" block>
              Add sub-Category
            </Button>
          </Form>
        </Col>
      </Row>
      <br />
      <Table striped bordered className="pt-5">
        <thead>
          <tr>
            <th>Category</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {category.length > 0
            ? category.map((cate, index) => {
                return (
                  <tr>
                    <td>
                      <h4>{cate.name} </h4>
                     
                        {cate.children.length &&
                          cate.children.map((item, i) => {
                            return(<tr> <tr>{item.name}</tr>  </tr>);
                          })}
                    </td>
                    <td>
                      <h4>{cate.children.length}</h4>
                      <tr>Button</tr>
                    </td>
                  </tr>
                );
              })
            : ""}
        </tbody>
      </Table>
    </div>
  );
};

export default SubCategory;
