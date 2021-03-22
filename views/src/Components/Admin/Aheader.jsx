import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {Link} from "react-router-dom";
import {useRouteMatch} from "react-router-dom";

function Aheader(props){
  let {path, url} = useRouteMatch();
    return(
        <Navbar bg="light" className="container-fluid" expand="lg">
  <Navbar.Brand as={Link} to={`${url}`} >Admin</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="ml-auto">
      <Nav.Link as={Link} to={`${url}/login`}>Login</Nav.Link>
      <Nav.Link as={Link} to={`${url}/Register`}>Register</Nav.Link>
    
     
    </Nav>
  
  </Navbar.Collapse>
</Navbar>)
  
}

export default Aheader;