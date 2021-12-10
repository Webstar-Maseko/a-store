import { useEffect, useState } from "react";
import ProductCard from "./Utils/ProductCard";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaQuestion } from "react-icons/fa";
import { IconContext } from "react-icons";
import { BsTruck } from "react-icons/bs";
import { GrLocation, GrCart } from "react-icons/gr";
import { CgTrack } from "react-icons/cg";
import HomeCard from "./Utils/HomeCard";
import CategoryDisplay from "./Utils/CategoryDisplay";
import HomeChildDisplay from "./Utils/HomeChildDisplay";
import HomeIconsDisplay from "./Utils/HomeIconsDisplay";

const Home = () => {
  let [products, setProducts] = useState([]);
  let [otherImage, setOther] = useState(false);

  function getProducts() {
    axios
      .get("api/product/getProduct")
      .then((res) => {
        setProducts(() => res.data);
      })
      .catch((err) => alert(err));
  }
  useEffect(getProducts, []);

  let ladies = [{name: "DRESSES", link:"Ladies/Shop By Category/dresses"}, {name: "FASHION TOPS",link:"Ladies/Shop By Category/fashion tops"},{name: "SHORTS", link:"Ladies/Shop By Category/shorts"},{name: "SHOES", link:"Ladies/Shop By Category/shoes"}]

  let men = [{name: "TEES", link:"Men/Shop By Category/tees"}, {name: "SHORTS",link:"Men/Shop By Category/shorts"},{name: "DENIM", link:"Men/Shop By Category/denim"}]


  return (
    <div className="mt-5 pt-2">
      <Row>
        <Col md={6} style={{ paddingLeft: 0, paddingRight: 0 }}>
        <CategoryDisplay name="LADIES" imageLink="Home_Ladies.png" categoryLink="Ladies"  />
         <HomeChildDisplay heading="Something for the ladies" categories={ladies} />
        </Col>

        <Col md={6} style={{ paddingLeft: 0, paddingRight: 0 }}>
         <CategoryDisplay name="MENS" imageLink="Home_Mens.png" categoryLink="Men" />
        <HomeChildDisplay heading="Something for the guys" categories={men} />

        </Col>
      </Row>

      <Row className="pt-3">
        <Col md={4} className="pl-0 pr-0 ">

        <CategoryDisplay name="BABY" name2="0-24 MONTHS" imageLink="Home_Baby.png" categoryLink="Baby" />
        </Col>
        <Col md={4} className="pl-0 pr-0 ">
        <CategoryDisplay name="KIDS" name2="1-7" imageLink="Home_Kids7.png" categoryLink="Kids" />
          
        </Col>
        <Col md={4} className="pl-0 pr-0">
        <CategoryDisplay name2="KIDS" name2="7-14" imageLink="Home_Kids14.png" categoryLink="kids" />
         
        </Col>
      </Row>

      <div className="pt-5">
        <div className="sub-head pt-5 text-center">
          <h2 className="head-h2 d-block">
            <span>We believe fashion is for everyone, which is why we</span>
            <br />
            <span>offer the latest looks sealed with outstanding value!</span>
          </h2>
          <br />
          <h4 className="head-h4">
            <span>
              Whether you're after that need-it-now trend or an everyday
              essential, you'll be sure to find it at
            </span>
            <br />
            <span>
              A-store- along with sleepwear, shoes and accessories for the whole
              family.
            </span>
          </h4>
        </div>
      </div>

      <div className="pt-4 container text-center pb-5">
      <HomeIconsDisplay name="FAQ'S" link="faqs" icon={FaQuestion}/>
      <HomeIconsDisplay name="DELIVERY & RETURNS" link="delivery" icon={BsTruck}/>
      <HomeIconsDisplay name="TRACK MY ORDER" link="trackOrder" icon={CgTrack}/>
      <HomeIconsDisplay name="STORE LOCATOR" link="storeLocator" icon={GrLocation}/>
      <HomeIconsDisplay name="HOW TO SHOP" link="howtoShop" icon={GrCart}/>
      </div>

      <div className="pt-5">
        <div className="sub-head pt-5 text-center">
          <h2 className="head-h2 d-block">
            <span> Everyone has their own style...</span>
          </h2>
        </div>
      </div>
      <div className="container-fluid">
        <Row>
          <Col sm={2} xs={6}>
            <HomeCard
              title="Home page"
              price="R200"
              img="OR_n5v8w-3"
              link="#"
            />
          </Col>
          <Col sm={2} xs={6}>
            <HomeCard
              title="Home page"
              price="R200"
              img="OR_n5v8w-3"
              link="#"
            />
          </Col>
          <Col sm={2} xs={6}>
            <HomeCard
              title="Home page"
              price="R200"
              img="OR_n5v8w-3"
              link="#"
            />
          </Col>
          <Col sm={2} xs={6}>
            <HomeCard
              title="Home page"
              price="R200"
              img="OR_n5v8w-3"
              link="#"
            />
          </Col>
          <Col sm={2} xs={6}>
            <HomeCard
              title="Home page"
              price="R200"
              img="OR_n5v8w-3"
              link="#"
            />
          </Col>
          <Col sm={2} xs={6}>
            <HomeCard
              title="Home page"
              price="R200"
              img="OR_n5v8w-3"
              link="#"
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home;
