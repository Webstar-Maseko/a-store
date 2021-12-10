import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {
  MdOutlineShoppingBag,
  MdPersonOutline,
  MdSearch,
} from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { IconContext } from "react-icons";
import Badge from "@material-ui/core/Badge";
import MenuHeader from "./MenuHeader";
import SearchHeader from "./SearchHeader";
import { useEffect } from "react";
import { IconButton } from "@material-ui/core";

const Header = () => {
  function burgerClick() {
    console.log("clicking");
  }

  return (
    <>
      <Navbar bg="light" fixed="top">
        <a className="burger">
          <IconContext.Provider value={{ size: "2em" }}>
            <GiHamburgerMenu className="mr-2 pt-1" />
          </IconContext.Provider>
        </a>

        <Navbar.Brand href="#home">
          <h2 style={{ fontWeight: 700, fontSize: "2.7rem" }}> a-store </h2>{" "}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto mr-auto">
            <SearchHeader />
          </Nav>
          <Nav className=" ml-auto mr-1">
            <IconContext.Provider value={{ size: "1.4em" }}>
              <IconButton className=" searchManipulate">
                <MdSearch />
              </IconButton>
            </IconContext.Provider>

            <IconContext.Provider value={{ size: "1.5em" }}>
              <IconButton>
                <MdPersonOutline className="" />
              </IconButton>
            </IconContext.Provider>

            <IconContext.Provider value={{ size: "1.6em" }}>
              <IconButton>
                <Badge className="" badgeContent={1} color="secondary">
                  <MdOutlineShoppingBag fontSize="large" />
                </Badge>
              </IconButton>
            </IconContext.Provider>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <MenuHeader />
    </>
  );
};

export default Header;
