import { useEffect, useState } from "react";
import ProductCard from "./Utils/ProductCard";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Men = () => {
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

  return (
    <div>
      <div alt="banner imgae" class="dv-bg"></div>

      <div className="text-center">
        <p className="customText text-center">
          Searching for that ultimate denim fit? Check out all our latest
          trending fits, ready to be your new favourite!{" "}
        </p>
        <a className="btn btn btn-outline-dark pl-5 pr-5 ">SHOP NOW </a>

        <div className="pt-5">
          <h2 className="header-l">LOOKS LIKE YOU'RE READY FOR NEWNESS!</h2>
        </div>
      </div>

      <Row>
        {products.length > 0 &&
          products.map((product, index) => (
            <Col md={4}>
              <a
                href="#"
                className="text-decoration-none"
                onMouseEnter={() => setOther(true)}
                omMouseLeave={() => setOther(false)}
              >
                <ProductCard
                  title={product.name}
                  price={"R" + product.price}
                  img={
                    otherImage ? product.images[1].img : product.images[0].img
                  }
                />
              </a>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default Men;
