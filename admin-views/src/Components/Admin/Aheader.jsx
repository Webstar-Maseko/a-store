import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../../Redux/store/slicers/UserSlicer";

function Aheader(props) {
  const { isLoggedIn } = useSelector((state) => state.adminUser);
  const dispatch = useDispatch();

  function logout(){
    dispatch(Logout());
  }

  let { url } = useRouteMatch();
  return (
    <Navbar
      bg="dark"
      variant="dark"
      className="container-fluid navbar"
      style={{ zIndex: 1 }}
      expand="lg"
      fixed="top"
    >
      <Navbar.Brand as={Link} to={`${url}`}>
        Admin
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          {isLoggedIn ? (
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
