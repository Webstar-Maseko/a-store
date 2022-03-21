import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "../../Redux/store/slicers/CategorySlicer";
import CategoryCircleItems from "../../Utils/CategoryCircleItems";
import ProductCard from "../../Utils/ProductCategory";
import ProductCategory from "../../Utils/ProductCategory";
import { kidsDisplay } from "../StaticData/DisplayLinks";

const Kids = () => {
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();
  let [kids, setKids] = useState([]);
  const display = kidsDisplay;

  useEffect(() => {
    dispatch(getCategories);
  }, [dispatch]);

  useEffect(() => {
    function locate() {
      setKids(category.filter((cat) => cat.slug === "kids"));
    }
    locate();
  }, [category]);

  return (
    <div className="mt-4 pt-5">
      <div className="text-center">
        <div className="banner">
          {kids.length > 0 ? (
            <img
              className=""
              src={`${process.env.PUBLIC_URL}/Category/images/${kids[0].image[0].img}`}
              alt="testing updating"
            />
          ) : (
            <h1>KIDS</h1>
          )}
        </div>
        <div className="text-center pt-2 pb-5">
          <p className="gePar pb-4">
          Let’s get loud in bold colours & the freshest co-ords you can mix & match for days… Load up on a variety of fleece & printed sets.
          </p>
          <Row>
            <Col xs={6} className="pl-0 pr-1 text-right">
            <a
            href="Kids/boys-1-7-years/"
            className="btn btn-outline-secondary pl-4 pr-4 text-dark"
          >
            SHOP BOYS 1-7
          </a></Col>
            <Col xs={6} className="pl-1 pr-0 text-left">
             <a
            href="Kids/girls-1-7-years/"
            className="btn btn-outline-secondary pl-4 pr-4 text-dark"
          >
            SHOP GIRLS 1-7
          </a></Col>
          </Row>

          
         
        </div>
      </div>
      <div className="text-center">
        <h2 className="spaceHead pt-5 pb-4">
          WHAT THEY REALLY REALLY WANT...
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
                <img className="img-fluid" src="https://cdn.omni.mrpg.com/cdn/01/content/2022/wk06/kids_reel01.png" alt="" />
            </button>
            </div>
          </Col>
          <Col xs={6} >
          <div className="wrapper">
            <button style={{ }}>
                <img className="img-fluid" src="https://cdn.omni.mrpg.com/cdn/01/content/2022/wk06/kids_reel02.png" alt="" />
            </button>
            </div>


          </Col>
        </Row>
      </div>

      <div className="container pb-5">
    

        <div className="text-center pt-4 pb-3">
          <h2 className="spaceHead pt-5 pb-4">LOOKING GOOD ON A BUDGET? EASY!</h2>
        </div>
        <Row>
          <Col xs={4} className="pl-0 pr-0">
            <ProductCategory img="https://cdn.omni.mrpg.com/cdn/01/content/2022/wk07/kids-mrp-callout03.png" link="Ladies/Shop by category/Dresses" />
          </Col>
          <Col xs={4} className="pl-0 pr-0">
          <ProductCategory img="https://cdn.omni.mrpg.com/cdn/01/content/2022/wk07/kids-mrp-callout01.png" link="Ladies/Shop by category/Active tops" />
          </Col>
          <Col xs={4} className="pl-0 pr-0">
          <ProductCategory img="https://cdn.omni.mrpg.com/cdn/01/content/2022/wk07/kids-mrp-callout02.png" link="Ladies/Shop by category/Fashion tops" />
          </Col>
        </Row>
      </div>



      <div className="text-center">
      <div className="text-center pt-4 pb-3">
          <h2 className="spaceHead pt-5 pb-4">THE COOLEST MUST-HAVES</h2>
        </div>
        <div className="banner">
          {kids.length > 0 ? (
            <img
              className=""
              src={`${process.env.PUBLIC_URL}/Category/images/${kids[0].image[1].img}`}
              alt="testing updating"
            />
          ) : (
            <h1>KIDS</h1>
          )}
        </div>
        <div className="text-center pt-4 pb-5">
        
          <Row>
            <Col xs={6} className="pl-0 pr-1 text-right">
            <a
            href="Kids/boys-7-14-years/"
            className="btn btn-outline-secondary pl-4 pr-4 text-dark"
          >
            SHOP BOYS 7-14
          </a></Col>
            <Col xs={6} className="pl-1 pr-0 text-left">
             <a
            href="Kids/girls-7-14-years/"
            className="btn btn-outline-secondary pl-4 pr-4 text-dark"
          >
            SHOP GIRLS 7-14
          </a></Col>
          </Row>

          
         
        </div>
      </div>
    </div>
  );
};

export default Kids;
