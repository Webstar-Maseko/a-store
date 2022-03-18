import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "../../Redux/store/slicers/CategorySlicer";
import CategoryCircleItems from "../../Utils/CategoryCircleItems";
import ProductCard from "../../Utils/ProductCategory";
import ProductCategory from "../../Utils/ProductCategory";
import { BabyDisplay } from "../StaticData/DisplayLinks";

const Baby = () => {
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();
  let [Baby, setBaby] = useState([]);
  const display = BabyDisplay;

  useEffect(() => {
    dispatch(getCategories);
  }, [dispatch]);

  useEffect(() => {
    function locate() {
      setBaby(category.filter((cat) => cat.name === "Baby"));
    }
    locate();
  }, [category]);

  return (
    <div className="mt-4 pt-5">
      <div className="text-center">
        <div className="banner">
          {Baby.length > 0 ? (
            <img
              className=""
              src={`${process.env.PUBLIC_URL}/Category/images/${Baby[0].image}`}
              alt="testing updating"
            />
          ) : (
            <h1>Baby</h1>
          )}
        </div>

        <div className="text-center pt-2 pb-5">
          <p className="gePar pb-4">
            They’re fresh, colourful and the value - amazing! Our new variety of
            body vests, sleepsuits and more are everything
          </p>

          <div className="text-center">
            <a href="" className="btn btn-outline-secondary pl-5 pr-5">
              SHOP NOW
            </a>
          </div>
        </div>
      </div>
      <div className="text-center">
        <h2 className="spaceHead pt-5 pb-4">LOADING UP ON NEW MUST-HAVES OFFICIALLY STARTS HERE…</h2>
        <CategoryCircleItems items={display} />
      </div>

      <div className="container pb-5">
        <div className="text-center pt-4">
          <h2 className="spaceHead pt-5 pb-4">SO. MANY. NEW. ARRIVALS. </h2>
        </div>
        <Row>
        <Col xs={3}>
          </Col>
          <Col xs={6}>
            <div className="wrapper">
              <button style={{}}>
                <img
                  className="img-fluid"
                  src="https://cdn.omni.mrpg.com/cdn/01/content/2022/wk08/kids-reel-allnewfaves.png"
                  alt=""
                />
              </button>
            </div>
          </Col>
          <Col xs={3}>
          </Col>
        </Row>
      </div>

      <div className="container pb-5">
        <div className="text-center pt-4 pb-3">
          <h2 className="spaceHead pt-5 pb-4">
          IT’S ABOUT TO BE A MINI FASH SITUATION
          </h2>
        </div>
        <Row>
          <Col xs={4} className="pl-0 pr-0">
            <ProductCategory
              img="https://cdn.omni.mrpg.com/cdn/01/content/2022/wk11/baby-callout01.png"
              link="Baby/nursery-0-18-months/rompers"
            />
          </Col>
          <Col xs={4} className="pl-0 pr-0">
            <ProductCategory
              img="https://cdn.omni.mrpg.com/cdn/01/content/2022/wk11/baby-callout02.png"
              link="Baby/Boys 3-14 Months/sets"
            />
          </Col>
          <Col xs={4} className="pl-0 pr-0">
            <ProductCategory
              img="https://cdn.omni.mrpg.com/cdn/01/content/2022/wk11/baby-callout03.png"
              link="Baby/nursery-0-18-months/sleepsuits"
            />
          </Col>
        </Row>
      </div>

      <div className="text-center pt-5">

        <div className="banner">
          {Baby.length > 0 ? (
            <img
              className=""
              src="https://cdn.omni.mrpg.com/cdn/01/content/2022/wk11/baby-bspot-tbl.png"
              alt="testing updating"
            />
          ) : (
            <h1>Baby</h1>
          )}
        </div>
        
        <div className="text-center pt-4 pb-5">
          <p className="gePar pb-4">
          From everyday ‘fits to weekend comfies, you can be sure that your babe will always look on point no matter what they’re doing.
          </p>

          <Row>
            <Col xs={6} className="pl-0 pr-1 text-right">
              <a
                href="Kids/boys-7-14-years/"
                className="btn btn-outline-secondary pl-4 pr-4 text-dark"
              >
                SHOP BOYS
              </a>
            </Col>
            <Col xs={6} className="pl-1 pr-0 text-left">
              <a
                href="Kids/girls-7-14-years/"
                className="btn btn-outline-secondary pl-4 pr-4 text-dark"
              >
                SHOP GIRLS
              </a>
            </Col>
          </Row>
        </div>
        <div className="text-center">
        <h2 className="spaceHead pt-5 pb-4">IT’S TIME FOR A REFRESH, LUCKILY YOU DON’T HAVE TO LOOK FAR.</h2>
        <CategoryCircleItems items={display} />
      </div>


      </div>
    </div>
  );
};

export default Baby;
