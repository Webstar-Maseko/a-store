import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../Redux/store/slicers/ProductSlicer";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import ListDrop from "../../Utils/ListDrop";
import Divider from "@material-ui/core/Divider";
import TabDrop from "../../Utils/TabDrop";
import Tab from "react-bootstrap/Tab";
import ProductCarousel from "../../Utils/ProductCarousel";
import ProductDetailsCard from "../../Utils/ProductDetailsCard";
import UseWindowDimensions from "../../Utils/UseWindowDimensions";

const Product = (props) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const width = UseWindowDimensions();

  useEffect(() => {
    const { match } = props;
    dispatch(getProduct(match.params.product));
  }, [dispatch]);


  return (
    <div className="pt-3 mt-5">
      <div className="container-fluid mt-3">
        <Row>
          <Col md={7} className="prodDisplay">
            <ProductCarousel images={product.images} />
            
          </Col>
          <Col md={5} className=" mt-4">
            <div className="container-fluid">
              <h3 className="text-dark font-weight-normal">{product.name}</h3>
              <h3 className="text-dark font-weight-bold ">R{product.price}</h3>
              <label className="text-dark">Phantom</label>

             <ProductDetailsCard size={product.size} color={product.color} price={product.price} sku={product.sku} id={product._id} />

             {width < 700 && 
              <div className="pt-2">
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
                      <span>
                        {" "}
                        Your order will take between 2-4 working days* to get to
                        you. You can track your order online under my account
                        and we will also notify you via email when your order
                        has been received, when your order has been shipped and
                        again when your order has been delivered.
                      </span>
                    </p>
                  </div>
                </ListDrop>
              </div>
              } 
            </div>
          </Col>
          {width > 700 && 
          <div className="container-flud mt-5 mb-5 ml-3 ">
           
          <TabDrop >
            <Tab eventKey="Description" title="Description" className="tabBg">
            <p className="container-fluid mt-3">
            <br />
             <span className="">{product.description}</span>
             <br />
             <br />
             <b>Fabric Content:</b>
                  <br />
                  <span>Lorem ipsum dolor sit. </span>
                  <br />
                  <br />
                  <b>Wash Care:</b>
                  <br />
                  <span>Lorem ipsum dolor sit. sc ascbc scsc sc sa dsaabsbc dasc as cascsacas chads ads cjwascsacasasbcs cs assa dcs ndsvds cv asnasd ads asc asc ascasdcasc snsd </span>
               
                    </p>
            
            </Tab>
            <Tab eventKey="About Phantom" title="About Phantom" className="tabBg">
            <span>Lorem ipsum dolor sit. sc ascbc scsc sc sa dsaabsbc dasc as cascsacas chads ads cjwascsacasasbcs cs assa dcs ndsvds cv asnasd ads asc asc ascasdcasc snsd </span>


            </Tab>
            <Tab eventKey="Delivery & Returns" title="Delivery & Returns" className="tabBg">
            <p>
                      <strong>DOOR TO DOOR:</strong>
                      <span>
                        {" "}
                        Your order will take between 2-4 working days* to get to
                        you. You can track your order online under my account
                        and we will also notify you via email when your order
                        has been received, when your order has been shipped and
                        again when your order has been delivered.
                      </span>
                    </p>
            </Tab>
          </TabDrop>

          </div>
      }
         
        </Row>
      </div>
    </div>
  );
};

export default Product;
