import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import { BsArrowRightCircle, BsYoutube } from "react-icons/bs";
import { TiSocialFacebook, TiSocialTwitter } from "react-icons/ti";
import { FaInstagram } from "react-icons/fa";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/Col";
import { IconContext } from "react-icons/lib";
import FooterLinkList from "./Utils/FooterLinkList";

export default function Footer() {
  const qLinks = [
    { name: "Men", url: "Men" },
    { name: "Ladies", url: "Ladies" },
    { name: "Kids", url: "Kids" },
    { name: "Baby", url: "Baby" },
    { name: "Accessories", url: "Accessories" },
  ];
  const helpLinks = [
    { name: "How to shop online", url: "howtoshop" },
    { name: "Delivery & Returns", url: "delivery" },
    { nane: "FAQ'S", url: "faqs" },
    { name: "Size Guides", url: "sizeguides" },
    { name: "Contact Us", url: "contact" },
  ];

  const aGroup = [
    { name: "About Us", url: "about" },
    { name: "Terms & Conditions", url: "terms" },
    { name: "Privacy Policy", url: "privacy" },
  ];
  return (
    <footer>
      <div className="first-foot bg-dark">
        <div className="container text-center">
          <FormGroup row>
            <h3 className="footHead pr-5 pt-2">Hook me up with fashion news</h3>
            <FormControlLabel control={<Checkbox />} label="All" />
            <FormControlLabel control={<Checkbox />} label="Ladies" />
            <FormControlLabel control={<Checkbox />} label="Mens" />
            <FormControlLabel control={<Checkbox />} label="Kids" />
            <Paper component="form" className="ml-3 ml-sm-1 emailForm">
              <InputBase
                className=" "
                id="custom-input2"
                placeholder="Email Address"
                
              />
              <IconButton>
                <BsArrowRightCircle />
              </IconButton>
            </Paper>
          </FormGroup>
        </div>
      </div>
      <div className="container pt-5 pb-2">
        <Row>
          <Col sm={3}>
            <FooterLinkList head="Quick Links" links={qLinks} />
          </Col>
          <Col sm={3}>
            <FooterLinkList head="Need Help?" links={helpLinks} />
          </Col>
          <Col sm={3}>
            <FooterLinkList head="A-store Group" links={aGroup} />
          </Col>
        </Row>
        <div className="text-center social-div pt-4 pb-4">
          <a href="#" className="ml-3 mr-3">
            <IconContext.Provider value={{ size: "1.7em" }}>
              <TiSocialFacebook />
            </IconContext.Provider>
          </a>
          <a href="#" className="ml-3 mr-3">
            <IconContext.Provider value={{ size: "1.7em" }}>
              <TiSocialTwitter />
            </IconContext.Provider>
          </a>
          <a href="#" className="ml-3 mr-3">
            <IconContext.Provider value={{ size: "1.7em" }}>
              <FaInstagram />
            </IconContext.Provider>
          </a>
          .
          <a href="#" className="ml-3 mr-3">
            <IconContext.Provider value={{ size: "1.7em" }}>
              <BsYoutube />
            </IconContext.Provider>
          </a>

          <p className="d-block pt-2">
            Follow us <b>@webstar_m </b>
          </p>
        </div>

        <p className="social-div text-center">
          © a-store 2021. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
