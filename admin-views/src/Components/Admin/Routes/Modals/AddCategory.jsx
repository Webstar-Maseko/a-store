import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useDispatch, useSelector} from "react-redux";
import { createCategory, getCategories } from "../../../../Redux/store/slicers/CategorySlicer";

const AddCategory = (props) => {
  //let [cate, setCat] = useState([]);
  let { register, errors, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const cate = useSelector(state => state.category);

  useEffect(() => {dispatch(getCategories)}, [dispatch]);

  function onSubmit(data) {
    const formData = new FormData();
 
    formData.append("gory", data.gory);
    formData.append("parentId", data.parentId);
    for (let i = 0; i < data.img.length; i++) {
      formData.append("img", data.img[i]);
    }
   dispatch(createCategory(formData))
    //setCategory();
  }

  function renderCategoriesOption(cate) {
    let myOptGroup = [];
    for (let category of cate) {
      myOptGroup.push(
        <>
          <option value={category._id} key={category._id}>{category.name} </option>
          {category.children.length > 0 ? (
            <optgroup label={category.name} key={category._id}>
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
              multiple
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
