import Modal from "react-bootstrap/Modal";
import TextField from "@material-ui/core/TextField";
import Button from "react-bootstrap/Button";
import { React } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { IconButton } from "@material-ui/core";
import { IconContext } from "react-icons";
import { useForm, Controller } from "react-hook-form";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { RegisterClient } from "../../Redux/store/slicers/UserSlicer";
import {useState} from "react";

import Error from "../../Error";

const Register = (props) => {
  const defaultValues = { firstName: "",lastName:"",password:"",username:"", phone:"" };
  let { handleSubmit, control } = useForm({ defaultValues });
  const dispatch = useDispatch();
  let [load, isLoading] = useState(false);
  const { message } = useSelector((state) => state.message);


  const onSubmit = (data) => {
   
    isLoading(() => true);
    dispatch(RegisterClient(data))
      .unwrap()
      .then(() => {
        isLoading(false);
        
        props.setReg(false);
        props.setSign(false);
        window.location.reload();
      
      })
      .catch((err) => {
        isLoading(() => false);
        
      });
  };

  return (
    <>
      <Modal.Header closeButton className="text-center">
        <IconContext.Provider value={{ size: ".7em" }}>
          <IconButton
            className="pb-0"
            onClick={() => {
              props.setReg(false);
              props.setSign(false);
            }}
          >
            <IoChevronBackOutline />
          </IconButton>
        </IconContext.Provider>

        <div className="auth ml-auto">Register</div>
      </Modal.Header>

      <Modal.Body>
        <div className="auth mt-5 mb-1 pl-3 pr-3 text-center">
          <div className=" pl-5 pr-5 ml-5 mr-5">
          {message && <Error message={message} />}
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="firstName"
                control={control}
                render={({ onChange, ref }) => {
                  return (
                    <TextField
                      name="firstName"
                      id="firstName"
                      label="First Name"
                      type="text"
                      variant="outlined"
                      block="true"
                      inputRef={ref}
                      onChange={onChange}
                    />
                  );
                }}
              />
             
             <br />

              <Controller
                name="lastName"
                control={control}
                render={({ onChange, ref }) => {
                  return (
                    <TextField
                      name="lastName"
                      id="lastName"
                      label="Last Name"
                      type="text"
                      className="mt-4"
                      variant="outlined"
                      block="true"
                      inputRef={ref}
                      onChange={onChange}
                    />
                  );
                }}
              />
              <br />

              <Controller
                render={({ onChange, ref }) => (
                  <TextField
                    id="email"
                    label="Email"
                    type="email"
                    variant="outlined"
                    block="true"
                    className="mt-4"
                    inputRef={ref}
                    onChange={onChange}
                  />
                )}
                control={control}
                name="username"
              />

              <br />
              <Controller
                render={({ onChange, ref }) => (
                  <TextField
                    id="phoneNumber"
                    label="Phone Number"
                    type="text"
                    variant="outlined"
                    className="mt-3"
                    name="phone"
                    inputRef={ref}
                    onChange={onChange}
                  />
                )}
                control={control}
                name="phone"
              />

              <br />

              <Controller
                render={({ onChange, ref }) => (
                  <TextField
                    id="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    className="mt-3"
                    name="password"
                    inputRef={ref}
                    onChange={onChange}
                  />
                )}
                control={control}
                name="password"
                rules={{ required: true, min: 8 }}
              />

              <Button
                variant="danger"
                block
                className="pl-5 pr-5 pt-3 pb-3 mt-4 mb-3"
                type="submit"
              >
               { load ?"Loading...":"Register"}
              </Button>
            </Form>

            <span className="text-btn2">
              We’ll be sending you the latest deals and keeping you informed
              along the way with order updates. By creating a profile you are
              agreeing to the A-Store terms and conditions, and privacy policy.
            </span>

            <p
              className="mt-5 text-btn"
              onClick={() => {
                props.setSign(true);
                props.setReg(false);
              }}
            >
              Already have a profile?
            </p>
          </div>
        </div>
      </Modal.Body>
    </>
  );
};

export default Register;
