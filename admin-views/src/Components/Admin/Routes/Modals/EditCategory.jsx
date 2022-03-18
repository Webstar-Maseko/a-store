import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Row";

const EditCategory = (props) => {
  let {
    register,
    errors,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitSuccessful },
  } = useForm();
  let [list, setList] = useState([]);

  function OnSubmit(data) {
    console.log(data.name);
  }
  useEffect(() => {
    setList(props.checkedList);
    console.log("List: " + list.length);
   
  }, [setList, props.checkedList, list, setValue]);

  function handleChange(e) {
    setValue("name", e.target.value);
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
          Edit Category
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          className=""
          onSubmit={handleSubmit(OnSubmit)}
          encType="multipart/form-data"
        >
          <Row>
            {list.length > 0 &&
              list.map((item, index) => {
                return (
                  <>
                    <Col sm={6} >
                    <input 
                        placeholder="Category Name"
                        //{...register("name")}
                        name="name"
                        value={item.name}
                        onChange={handleChange}
                        ref={register({ required: true })}
                      />
                    </Col>

                    <Col sm={6}>
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
                    </Col>
                  </>
                );
              })}
          </Row>

          <br />
          <div className="text-center">
            <Button className="btn-success" type="submit">
              Save Changes
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

export default EditCategory;
