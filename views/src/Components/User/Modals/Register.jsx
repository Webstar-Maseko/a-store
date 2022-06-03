import Modal from "react-bootstrap/Modal";
import TextField from "@material-ui/core/TextField";
import Button from "react-bootstrap/Button";
import { React } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { IconButton } from "@material-ui/core";
import { IconContext } from "react-icons";
import { useForm, Controller } from "react-hook-form";
import Form from "react-bootstrap/Form";

const Register = (props) => {
  let { register, error, handleSubmit, control } = useForm();

  const onSubmit = (data) => {
    console.log(data);
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

        <div className="auth ml-auto">Register</div>
      </Modal.Header>

      <Modal.Body>
        <div className="auth mt-5 mb-1 pl-3 pr-3 text-center">
          <div className=" pl-5 pr-5 ml-5 mr-5">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="firstName"
                control={control}
                defaultValue=""
                render={({
                  field
                  
                }) => (
                  <TextField
                    id="firstName"
                    label="First Name"
                    type="text"
                    variant="outlined"
                    block
                    {...field}
                  />
                )}

                rules={{required:"This is required"}}
              />
              <br />

              <TextField
                id="lastName"
                label="Last Name"
                type="text"
                variant="outlined"
                block
                className="mt-4"
                name="lastName"
                ref={register({ required: true })}
              />
              <br />

              <TextField
                id="email"
                label="Email"
                type="email"
                variant="outlined"
                block
                className="mt-4"
                name="email"
                ref={register({ required: true })}
              />
              <br />

              <TextField
                id="phoneNumber"
                label="Phone Number"
                type="text"
                variant="outlined"
                className="mt-3"
                name="phone"
                ref={register({ required: true })}
              />
              <br />

              <TextField
                id="password"
                label="Password"
                type="password"
                variant="outlined"
                className="mt-3"
                name="password"
                ref={register({ required: true })}
              />

              <Button
                variant="danger"
                block
                className="pl-5 pr-5 pt-3 pb-3 mt-4 mb-3"
                type="submit"
              >
                Register
              </Button>
            </Form>

            <span className="text-btn2">
              We’ll be sending you the latest deals and keeping you informed
              along the way with order updates. By creating a profile you are
              agreeing to the Mr Price Group LTD terms and conditions, and
              privacy policy.
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
