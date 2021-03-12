import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {Link} from "react-router-dom";

function Aheader(props){
    return(
        <Navbar bg="light" className="container-fluid" expand="lg">
  <Navbar.Brand href="#home">Admin</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="ml-auto">
      <Nav.Link as={Link} to="/admin/login">Login</Nav.Link>
      <Nav.Link as={Link} to="/admin/Register">Register</Nav.Link>
    
     
    </Nav>
  
  </Navbar.Collapse>
</Navbar>)
  
}

export default Aheader;