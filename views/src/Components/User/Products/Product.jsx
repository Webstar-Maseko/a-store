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
import Input from "@material-ui/core/Input";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import ListDrop from "../../Utils/ListDrop";
import Divider from '@material-ui/core/Divider';


const Product = (props) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  let [name, setName] = useState(props.match.params);
  let [quantity, setQuantiy] = useState(1);


  useEffect(() => {
    const { match } = props;
    dispatch(getProduct(match.params.product));
  }, [dispatch]);

  const IncreaseQuantiy = () => {
    setQuantiy(() => {
      if (quantity < 5) return (quantity += 1);
      else {
        return 5;
      }
    });
  };
  const DecreaseQuantiy = () => {
    setQuantiy(() => {
      if (quantity > 0) return (quantity -= 1);
      else {
        return 0;
      }
    });
  };

  const QuantityChange = (e) => {
    setQuantiy(e.target.value === "" ? "" : Number(e.target.value));
  };

  const handleBlur = () => {
    if (quantity < 0) setQuantiy(0);
    else if (quantity > 5) {
      setQuantiy(5);
    }
  };


  return (
    <div className="pt-3 mt-5">
      <div className="container-fluid mt-3">
        {console.log(product)}
        <Row>
          <Col md={7} className="prodDisplay">
            <Carousel variant="dark">
              {product.images &&
                product.images.map((item, index) => (
                  <Carousel.Item key={index} className="prodDisplay">
                    <img
                      className="d-block w-100 prodDisplay"
                      src={`${process.env.PUBLIC_URL}/assets/images/${item.img}`}
                      alt="Cannot find product"
                    />
                    <span
                      aria-hidden="true"
                      className="carousel-control-next-icon"
                    />
                    <span
                      aria-hidden="true"
                      className="carousel-control-prev-icon"
                    />
                  </Carousel.Item>
                ))}
            </Carousel>
          </Col>
          <Col md={5} className=" mt-4">
            <div className="container-fluid">
              <h3 className="text-dark font-weight-normal">{product.name}</h3>
              <h3 className="text-dark font-weight-bold ">R{product.price}</h3>
              <label className="text-dark">Phantom</label>

              <Card>
                <CardContent>
                  <label>SKU: 123459678</label>

                  <label className="d-block mt-2">Color: </label>
                  <Radio />

                  <label className="d-block mt-2">Size: </label>
                  <Radio />
                  <Radio />
                  <Radio />
                  <Radio />

                  <label htmlFor="" className="d-block pt-2">
                    Quantity:
                  </label>

                  <div className="pb-3">
                    <button onClick={DecreaseQuantiy} className="quantity mr-2">
                      <AiOutlineMinus />
                    </button>
                    <Input
                      id="custom-input3"
                      inputProps={{ step: 1, min: 1, max: 5, type: "number" }}
                      type="text"
                      value={quantity}
                      onChange={QuantityChange}
                      onBlur={handleBlur}
                    />
                    <button onClick={IncreaseQuantiy} className="quantity ml-2">
                      <AiOutlinePlus />
                    </button>
                  </div>

                  <div className="text-center">
                    <label className="itemlabel">Availability: </label>
                    <label className="itemlabel text-danger">
                      {" "}
                      In stock. Bag it now!
                    </label>
                    <button className="btn btn-danger btn-block text-center pt-3 pb-3">
                      ADD TO BAG
                    </button>
                  </div>
                </CardContent>
                <CardActions></CardActions>
              </Card>
              <div className="pt-4">
              <ListDrop name="DESCRIPTION">
              {product.description}
                <br />
                <br />
                <br />
                <b>Fabric Content:</b>
                <br />
                Lorem ipsum dolor sit.
                <br />
                <br />
                <b>Wash Care:</b>
                <br />
                Lorem, ipsum dolor.

              </ListDrop>
              <Divider />

              <ListDrop name="DELIVERY & RETURNS">
              <div className="pl-3">
              <p>
              <strong>DOOR TO DOOR:</strong>
              <span> Your order will take between 2-4 working days* to get to you. You can track your order online under my account and we will also notify you via email when your order has been received, when your order has been shipped and again when your order has been delivered.</span>
              </p>
              </div>
              
             
              </ListDrop>
                {/* <List
                  component="nav"
                >
                <ListItem button onClick={handleOpen} className="pl-0">
                <ListItemText primary="DESCRIPTION"  />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} unmountOnExit>
                {product.description}
                <br />
                <br />
                <br />
                <b>Fabric Content:</b>
                <br />
                Lorem ipsum dolor sit.
                <br />
                <br />
                <b>Wash Care:</b>
                <br />
                Lorem, ipsum dolor.
                </Collapse>

                </List> */}
                

                
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Product;
