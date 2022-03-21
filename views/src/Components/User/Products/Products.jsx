import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../Redux/store/slicers/ProductSlicer";
import ProductCard from "../../Utils/ProductCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Breadcrumb from "react-bootstrap/Breadcrumb";

const Products = (props) => {
  const products = useSelector((state) => state.product);
  const dispatch = useDispatch();
  let [name, setName] = useState(props.match.params);

  function getProd() {
    const { match } = props;

    dispatch(getProducts(match.params));
  }

  useEffect(getProd, [dispatch, props]);

  return (
    <div className="mt-5 pt-5">
      <div className="text-center mt-3">
        <h1 className="font-weight-bold ">
          {name.category[0].toUpperCase() + name.category.slice(1).replaceAll("-", " ")}
        </h1>
      </div>
      <div className="mt-3">
        <Breadcrumb className="bg-white">
          <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
          <Breadcrumb.Item href={name.root}>
            {name.root[0].toUpperCase() +
              name.root.slice(1).replaceAll("-", " ")}
          </Breadcrumb.Item>
          <Breadcrumb.Item href={name.root + "/" + name.sub}>
            {name.sub[0].toUpperCase() + name.sub.slice(1).replaceAll("-", " ")}
          </Breadcrumb.Item>
          <Breadcrumb.Item active>
            {name.category[0].toUpperCase() + name.category.slice(1).replaceAll("-", " ")}
          </Breadcrumb.Item>
        </Breadcrumb>

        <div className="mt-3 sticky-top">
          <Row>
            <Col xs={6} className="text-right pr-1">
              <label>
                {name.category[0].toUpperCase() + name.category.slice(1).replaceAll("-", " ")}
              </label>
            </Col>
            <Col xs={6} className="text-left pl-1">
              {" "}
              <label className=" font-weight-light">
                {products.length} Results
              </label>{" "}
            </Col>
          </Row>
        </div>
        <hr />
      </div>
      <div className="container-fluid">
        {products.length > 0 ? (
          <Row>
            {products.map((item, index) => (
              <Col sm={3} xs={6} className="pr-0 mr-0 text-center">
                <ProductCard
                  link={item.slug}
                  img={item.images[0].img}
                  key={index}
                  title={item.name}
                  price={"R" + item.price}
                />{" "}
              </Col>
            ))}
          </Row>
        ) : (
          <div className="cat">
            <h1>Oops We can't find any products at the moment </h1>{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
