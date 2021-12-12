import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const AddCategory = (props) => {
  let [cate, setCat] = useState([]);
  let { register, errors, handleSubmit } = useForm();

  function setCategory() {
    axios
      .get("/api/category/index")
      .then((res) => setCat((x) => res.data))
      .catch((error) => alert(error));
  }
  useEffect(setCategory, []);
  function onSubmit(data) {
    const formData = new FormData();
    formData.append("img", data.img[0]);
    formData.append("gory", data.gory);
    formData.append("parentId", data.parentId);

    axios
      .post("/api/category/create", formData)
      .then((res) => {alert("Successfully saved")})
      .catch((error) => alert(error));
    setCategory();
  }

  function renderCategoriesOption(cate) {
    let myOptGroup = [];
    console.log(cate);
    for (let category of cate) {
      myOptGroup.push(
        <>
          <option value={category._id} key={category.name}>{category.name} </option>
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
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Category
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={handleSubmit(onSubmit)}
          className=" pb-5"
          encType="multipart/form-data"
        >
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
            {renderCategoriesOption(cate)}
          </Form.Control>
          <br />
          <Form.Group>
            <input
              label="Images"
              name="img"
              type="file"
              accept="image/*"
              ref={register}
            />
          </Form.Group>
          <Button variant="dark" block type="submit">
            Add Category
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn-secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddCategory;
