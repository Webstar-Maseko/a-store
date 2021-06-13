import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

function Aheader(props) {
  const { user, logout } = useContext(AuthContext);
  let { url } = useRouteMatch();
  return (
    <Navbar
      bg="dark"
      className="container-fluid navbar navbar-light"
      style={{ zIndex: 1 }}
      expand="lg"
    >
      <Navbar.Brand as={Link} to={`${url}`}>
        Admin
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {user ? (
            <Nav.Link onClick={logout}>Logout</Nav.Link>
          ) : (
            <>
              <Nav.Link as={Link} to={`${url}/login`}>
                Login
              </Nav.Link>
              <Nav.Link as={Link} to={`${url}/Register`}>
                Register
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Aheader;
