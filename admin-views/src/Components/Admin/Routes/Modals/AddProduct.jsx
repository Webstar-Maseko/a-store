import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "../../../../Redux/store/slicers/CategorySlicer";
import { CreateProduct } from "../../../../Redux/store/slicers/ProductSlicer";
import SuccessToast from "../Toasts/SuccessToast";

const AddProduct = (props) => {
  let {
    register,
    errors,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm();
  let [parent_id, setId] = useState("");
  const [submittedData, setSubmittedData] = useState({});
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category);
  // const products = useSelector(state => state.products)

  function setCategory() {
    dispatch(getCategories());
  }
  function cateChange(e) {
    console.log(e.target.value);
    setId(e.target.value);
  }
  useEffect(setCategory, [dispatch]);

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
    dispatch(CreateProduct(formData))
      .unwrap()
      .then(() => {
        <SuccessToast isOpen={true}/>;
        reset({ data });
      });
  }

  useEffect(() => {
    console.log(isSubmitSuccessful);
    console.log(submittedData);
    isSubmitSuccessful && reset({ ...submittedData });
  }, [isSubmitSuccessful, submittedData, reset]);

  function renderCategoriesOption(cate) {
    let myOptGroup = [];
    for (let category of cate) {
      myOptGroup.push(
        <>
          <option key={category._id} value={category._id}>
            {category.name}{" "}
          </option>
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
