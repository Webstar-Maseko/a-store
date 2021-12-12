import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import Error from "../../Error";

export default function Alogin(props) {
  let { register, handleSubmit, errors } = useForm();
  const context = useContext(AuthContext);
  const { user, logout } = useContext(AuthContext);

  let [error, setError] = useState("");
  let [load, isLoading] = useState(false);

  function onSubmit(data) {
    isLoading(() => true);
    setError(() => "");
    axios
      .post("/api/admin/login", data)
      .then((res) => {
        context.login(res.data);
        props.history.push("/admin");
        isLoading(() => false);
      })
      .catch((err) => {
        setError(() => "username or password is not recognized");
        isLoading(() => false);
      });
  }
  useEffect(() =>{
      function check(){
        user && props.history.push("/admin");
      }
      check();
  })

  return (
    <Row className="mt-5">
      <Col md={2}></Col>
      <Col md={8}>
        <Card className="shadow">
          <Card.Body>
            <Row>
              <Col className="text-center pt-5 pb-5" md={4}>
                <SupervisedUserCircleIcon style={{ fontSize: "80" }} />
              </Col>
              <Col md={8} className="text-center pt-2 pb-5">
                <h5>Admin Login</h5>
                {error !== "" && <Error message={error} />}
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Control
                    type="email"
                    name="username"
                    ref={register({
                      required: "please enter your registered email",
                    })}
                    className="bt-0"
                    placeholder="Email"
                  />

                  {errors.username && (
                    <span className="text-danger">
                      {errors.username.message}
                    </span>
                  )}
                  <Form.Control
                    type="password"
                    name="password"
                    ref={register({ required: true })}
                    placeholder="Password"
                  />
                  {errors.password && (
                    <span className="text-danger">invalid password</span>
                  )}
                  <br />
                  <Button
                    variant="outline-success"
                    type="submit"
                    className={load ? "disabled" : null}
                    block
                  >
                    {load ? "loading" : "Login"}{" "}
                  </Button>
                </Form>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
      <Col md={2}></Col>
    </Row>
  );
}
