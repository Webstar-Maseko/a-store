import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "../../Redux/store/slicers/CategorySlicer";
import CategoryCircleItems from "../../Utils/CategoryCircleItems";
import ProductCard from "../../Utils/ProductCategory";
import ProductCategory from "../../Utils/ProductCategory";
import { MenDisplay } from "../StaticData/DisplayLinks";

const Men = () => {
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();
  let [men, setMen] = useState([]);
  const display = MenDisplay;

  useEffect(() => {
    dispatch(getCategories);
  }, [dispatch]);

  useEffect(() => {
    function locate() {
      setMen(category.filter((cat) => cat.slug === "men"));
    }
    locate();
  }, [category]);

  return (
    <div className="mt-4 pt-5">
      <div className="text-center">
        <div className="banner">
          {men.length > 0 ? (
            <img
              className=""
              src={`${process.env.PUBLIC_URL}/Category/images/${men[0].image[0].img}`}
              alt="testing updating"
            />
          ) : (
            <h1>MEN</h1>
          )}
        </div>
        <div className="text-center pt-2 pb-5">
          <p className="gePar pb-5">
            It’s about that time when you check in with us for a fresh drop of
            must haves with all the trends you’ll wanna be wearing.
          </p>

          <a
            href="mens/shop by category/demim"
            className="btn btn-outline-dark pl-5  pr-5"
          >
            SHOP NOW
          </a>
        </div>
      </div>
      <div className="text-center">
        <h2 className="spaceHead pt-5 pb-4">
          THING JUST GOT A WHOLE LOT FRESHER.
        </h2>
        <CategoryCircleItems items={display} />
      </div>

      <div className="container pb-5">
      <div className="text-center pt-4">
        <h2 className="spaceHead pt-5 pb-4">JUST DROPPED!</h2>
      </div>
        <Row>
          <Col xs={6}>
            <div className="wrapper">
            <button style={{ }}>
                <img className="img-fluid" src="https://cdn.omni.mrpg.com/cdn/01/content/2022/wk03/mens-reel02.png" alt="" />
            </button>
            </div>
          </Col>
          <Col xs={6}>
          <div className="wrapper">
            <button style={{ }}>
                <img className="img-fluid" src="https://cdn.omni.mrpg.com/cdn/01/content/2022/wk03/mens-reel03.png" alt="" />
            </button>
            </div>


          </Col>
        </Row>
      </div>

      <div className="container pb-5">
    

        <div className="text-center pt-4">
          <h2 className="spaceHead pt-5 pb-4">THE HOTTEST MUST-HAVES</h2>
        </div>
        <Row>
          <Col xs={4} className="pl-0 pr-0">
            <ProductCategory img="https://cdn.omni.mrpg.com/cdn/01/content/2022/wk05/01Mens_CO.png" link="Men/Shop by category/Jackets" />
          </Col>
          <Col xs={4} className="pl-0 pr-0">
          <ProductCategory img="https://cdn.omni.mrpg.com/cdn/01/content/2022/wk05/02Mens_CO.png" link="Men/Shop by category/Denim" />
          </Col>
          <Col xs={4} className="pl-0 pr-0">
          <ProductCategory img="https://cdn.omni.mrpg.com/cdn/01/content/2022/wk05/03Mens_CO.png" link="Men/Shop Accessories/Accessories" />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Men;
