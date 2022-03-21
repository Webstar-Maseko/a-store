import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../Redux/store/slicers/ProductSlicer";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Radio from "@material-ui/core/Radio";
import Carousel from "react-bootstrap/Carousel";

const Product = (props) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  let [name, setName] = useState(props.match.params);

  useEffect(() => {
    const { match } = props;
    dispatch(getProduct(match.params.product));
  }, [dispatch]);

  return (
    <div className="pt-5 mt-5">
      <div className="container-fluid mt-3">
        {console.log(product)}
        <Row>
          <Col md={7} className="">
            <Carousel>
              {product.images && product.images.map((item, index) => (
                <Carousel.Item key={index}>
                  <img
                    className=" w-100"
                    src={`${process.env.PUBLIC_URL}/assets/images/${item.img}`}
                    alt="Cannot find product" />
                </Carousel.Item>
              ))}

              <span aria-hidden="true" className="carousel-control-next-icon" />
              <span aria-hidden="true" className="carousel-control-prev-icon" />
            </Carousel>
          </Col>
          <Col md={5} className="">
            <div className="container-fluid">
              <h3 className="text-dark font-weight-normal">{product.name}</h3>
              <h3 className="text-dark font-weight-bold ">R{product.price}</h3>
              <label className="text-dark">Phantom</label>

              <Card>
                <CardContent>
                  <label>SKU:123459678</label>

                  <label className="d-block">Color: </label>
                  <Radio />

                  <label className="d-block">Size: </label>
                  <Radio />
                  <Radio />
                  <Radio />
                  <Radio />

                  <label htmlFor="" className="d-block pt-2">
                    Quantity
                  </label>

                  <input type="text" />

                  <p>lorem500</p>
                </CardContent>
                <CardActions></CardActions>
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Product;
