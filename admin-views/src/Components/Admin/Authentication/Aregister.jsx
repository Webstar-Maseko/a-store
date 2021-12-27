import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import Error from "../../Error";
import { useSelector, useDispatch } from "react-redux";
import { Register } from "../../../Redux/store/slicers/UserSlicer";

export default function Aregister(props) {
  const [loading, setLoading] = useState(false);
  let { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.message);
  // function vConfirmpwd() {
  //   if (userEx !== "") {
  //     return userEx;
  //   }
  //   return true;
  // }

  function onSubmit(data) {
    setLoading(true);
    dispatch(Register(data))
      .unwrap()
      .then(() => {
        setLoading(false);
        props.history.push("/admin");
      })
      .catch((err) => {
        setLoading(false);
        alert(err);
      });
  }
  return (
    <Row className="mt-5">
      <Col md={2}></Col>
      <Col md={8}>
        <Card className="shadow">
          <Card.Body className="text-center">
            <SupervisedUserCircleIcon style={{ fontSize: "70" }} />
            <h5>Admin Register</h5>
            <br />
            {message && <Error message={message} />}

            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Control
                type="email"
                ref={register({ required: "email is required" })}
                name="username"
                className="pt-2"
                placeholder="Email"
              />
              {errors.username && (
                <span className="text-danger">{errors.username.message}</span>
              )}

              <Form.Control
                type="text"
                ref={register({ required: true })}
                name="firstName"
                className="pt-2"
                placeholder="First Name"
              />
              {errors.firstName && (
                <span className="text-danger">first name is required</span>
              )}
              <Form.Control
                type="text"
                ref={register({ required: true })}
                name="lastName"
                className="pt-2"
                placeholder="Last Name"
              />
              {errors.lastName && (
                <span className="text-danger">last name is required</span>
              )}
              <Form.Control
                className="pt-2"
                ref={register({ required: true })}
                name="phone"
                placeholder="Phone number"
              />
              {errors.phone && (
                <span className="text-danger">phone number is required</span>
              )}
              <Form.Control
                type="password"
                ref={register({
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "password should be at least 6 characters",
                  },
                })}
                name="password"
                className="pt-3 pb-3"
                placeholder="Password"
              />
              {errors.password && (
                <span className="text-danger">{errors.password.message}</span>
              )}

              <Form.Control
                type="password"
                ref={register({ required: true })}
                name="confirmPwd"
                className="pt-3 pb-3"
                placeholder="Confirm Password"
              />
              {errors.confirmPwd && (
                <span className="text-danger">
                  confirmation password is required
                </span>
              )}
              <br />
              <br />
              <Button variant="outlined" {...loading && "loading"} type="submit">{loading ? "Loading..." : "Register"}</Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
      <Col md={2}></Col>
    </Row>
  );
}
