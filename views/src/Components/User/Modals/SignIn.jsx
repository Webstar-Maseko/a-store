import Modal from "react-bootstrap/Modal";
import TextField from "@material-ui/core/TextField";
import Button from "react-bootstrap/Button";
import { React, useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { IconButton } from "@material-ui/core";
import { IconContext } from "react-icons";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { Login } from "../../Redux/store/slicers/UserSlicer";
import Error from "../../Error";
import { setMessage } from "../../Redux/store/slicers/MessageSlicer";
import Form from "react-bootstrap/Form";

const SignIn = (props) => {
  const defaultValues = { username: "", password: "" };
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.message);
  let { handleSubmit, control } = useForm({ defaultValues });
  let [load, isLoading] = useState(false);

  const onSubmit = (data) => {
    isLoading(() => true);
    dispatch(Login(data))
      .unwrap()
      .then(() => {
        isLoading(() => false);
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
          <IconButton className="pb-0">
            <IoChevronBackOutline
              onClick={() => {
                props.setReg(false);
                props.setSign(false);
              }}
            />
          </IconButton>
        </IconContext.Provider>

        <div className="auth ml-auto">Sign in</div>
      </Modal.Header>

      <Modal.Body>
        <div className="auth mt-5 mb-1 pl-3 pr-3 text-center">
          <div className=" pl-5 pr-5 ml-5 mr-5">
            {message && <Error message={message} />}
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="username"
                control={control}
                render={({ onChange, ref }) => (
                  <TextField
                    id="outlined-search"
                    label="Email"
                    type="text"
                    variant="outlined"
                    block="true"
                    inputRef={ref}
                    onChange={onChange}
                  />
                )}
              />
              <br />
              <Controller
                name="password"
                control={control}
                render={({ onChange, ref }) => (
                  <TextField
                    id="outlined-search"
                    label="Password"
                    type="password"
                    variant="outlined"
                    className="mt-3"
                    block="true"
                    inputRef={ref}
                    onChange={onChange}
                  />
                )}
              />

              <Button
                variant="danger"
                block
                className="pl-5 pr-5 pt-3 pb-3 mt-4 mb-3"
                type="submit"
              >
                {load ? "Loading..." : "SIGN IN"}
              </Button>
            </Form>

            <span className="text-btn" onClick={() => props.setSign(false)}>
              Forgot your password?
            </span>

            <p
              className="mt-5 text-btn"
              onClick={() => {
                props.setReg(true);
                props.setSign(false);
              }}
            >
              Don't have a profile?
            </p>
          </div>
        </div>
      </Modal.Body>
    </>
  );
};

export default SignIn;
