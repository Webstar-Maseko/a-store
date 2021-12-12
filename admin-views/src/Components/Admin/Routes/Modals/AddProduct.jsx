import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import Label from "react-bootstrap/FormLabel";
import { useEffect, useState } from "react";
import axios from "axios";

const AddProduct = (props) => {
  let { register, errors, handleSubmit } = useForm();
  let [categories, setCategories] = useState([]);
  let [parent_id, setId] = useState("");
  let [imgs, setImgs] = useState(undefined);

  function setCategory() {
    axios
      .get("/api/category/index")
      .then((res) => setCategories((x) => res.data))
      .catch((error) => alert(error));
  }
  function cateChange(e) {
    console.log(e.target.value);
    setId(e.target.value);
  }
  useEffect(setCategory, []);

  function onSubmit(data) {
    const formData = new FormData();
    formData.append("name", data.name);

    formData.append("price", data.price);
    formData.append("quantity", data.quantity);
    formData.append("description", data.description);
    formData.append("size", data.size);
    formData.append("category", data.category);
    for (let i = 0; i < data.img.length; i++) {
      formData.append("img", data.img[i]);
    }
 
    axios
      .post("api/product/create", formData)
      .then((res) => alert("product added successfully"))
      .catch((err) => alert(err));
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

  function desiredCat(categories) {
    let desiredCatArr = [];
    for (let category of categories) {
      desiredCatArr.push(
        category.parentId === parent_id ? (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ) : category.children.length > 0 ? (
          desiredCat(category.children)
        ) : null
      );
    }
    return desiredCatArr;
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
          Add product
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          className=""
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
        >
          <Form.Control
            placeholder="Product name"
            name="name"
            ref={register({ required: true })}
          />
          {errors.name && <span className="text-danger">{errors.message}</span>}
          <Form.Control
            placeholder="Price"
            name="price"
            ref={register({ required: true })}
          />
          {errors.price && (
            <span className="text-danger">{errors.message}</span>
          )}
          <Form.Control
            placeholder="Quantity"
            name="quantity"
            ref={register({ required: true })}
          />
          {errors.quantity && (
            <span className="text-danger">{errors.message}</span>
          )}
          <br />
          <Form.Control
            as="textarea"
            placeholder="Description"
            name="description"
            ref={register({ required: true })}
          />
          {errors.description && (
            <span className="text-danger">{errors.message}</span>
          )}
          <br />

          <Form.Control
            name="size"
            placeholder="Size"
            ref={register({ required: true })}
          />
          {errors.size && <span className="text-danger">{errors.message}</span>}
          <br />

          <Form.Control
            as="select"
            name="parent"
            onChange={cateChange}
            ref={register({ required: true })}
          >
            <option key="0" disabled selected value="" hidden>
              Select Parent category
            </option>
            {renderCategoriesOption(categories)}
            {/* {categories.length > 0 &&
              categories.map((item, index) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))} */}
          </Form.Control>
          {errors.parent && (
            <span className="text-danger">{errors.message}</span>
          )}

          <br />
          <Form.Control
            as="select"
            name="category"
            ref={register({ required: true })}
          >
            <option key="0" disabled selected value="" hidden>
              Select Category
            </option>
            {desiredCat(categories)}
            {/* {categories.length > 0 &&
              categories.map((cate, i) => {
                let child = cate.children.filter(
                  (item) => item.parentId === parent_id
                );
                return child.map((item, index) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ));
              })} */}
          </Form.Control>
          {errors.category && (
            <span className="text-danger">{errors.message}</span>
          )}
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

          <br />
          <div className="text-center">
            <Button className="btn-success" type="submit">
              Add product
            </Button>
          </div>
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

export default AddProduct;
