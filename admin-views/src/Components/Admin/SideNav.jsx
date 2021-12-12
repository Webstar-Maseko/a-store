import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useRouteMatch } from "react-router-dom";

function SideNav() {
  let { url } = useRouteMatch();

  return (
    <Navbar
      expand="md"
      fixed=""
      className="pl-0 pt-0 navbar-dark bg-dark mt-5 pt-2  pr-0"
    >
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse aria-orientation="vertical" id="basic-navbar-nav">
        <Nav
          variant="pills"
          data-spy="affix"
          defaultActiveKey={`${url}`}
          className="nav flex-column sticky customNav  pt-1"
        >
          <Nav.Item className="pb-0">
            <Nav.Link as={Link} to={`${url}`}>
              Orders
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="pb-0">
            <Nav.Link as={Link} to={`${url}/products`} eventKey="link-1">
              Products
            </Nav.Link>
          </Nav.Item>

          <Nav.Item className="pb-0">
            <Nav.Link as={Link} to={`${url}/category`} eventKey="link-3">
              Category
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="pb-0">
            <Nav.Link as={Link} to={`${url}/history`} eventKey="link-4">
              history
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default SideNav;
