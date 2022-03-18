import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "../../Redux/store/slicers/CategorySlicer";
import CategoryCircleItems from "../../Utils/CategoryCircleItems";
import ProductCard from "../../Utils/ProductCategory";
import ProductCategory from "../../Utils/ProductCategory";
import { LadiesDisplay } from "../StaticData/DisplayLinks";


const Ladies = () => {
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();
  let [ladies, setLadies] = useState([]);
  const display = LadiesDisplay

  useEffect(() => {
    dispatch(getCategories);
  }, [dispatch]);

  useEffect(() => {
    function locate() {
      setLadies(category.filter((cat) => cat.name === "Ladies"));
    }
    locate();
  }, [category]);

  return (
    <div className="mt-4 pt-5">
      <div className="text-center">
        <div className="banner">
          {ladies.length > 0 ? (
            <img
              className=""
              src={`${process.env.PUBLIC_URL}/Category/images/${ladies[0].image}`}
              alt="testing updating"
            />
          ) : (
            <h1>LADIES</h1>
          )}
        </div>
        <div className="text-center pt-2 pb-5">
          <p className="gePar pb-4">
            It’s about that time when you check in with us for a fresh drop of
            must haves with all the trends you’ll wanna be wearing.
          </p>
          <Row>
            <Col xs={6} className="pl-0 pr-1 text-right">
            <a
            href="Ladies/fashion-faves"
            className="btn btn-outline-secondary pl-3 pr-3 text-dark"
          >
            SHOP NOW
          </a></Col>
            <Col xs={6} className="pl-1 pr-0 text-left">
             <a
            href="Inspiration"
            className="btn btn-outline-secondary pl-3 pr-3 text-dark"
          >
            GET INSPIRED
          </a></Col>
          </Row>

          
         
        </div>
      </div>
      <div className="text-center">
        <h2 className="spaceHead pt-5 pb-4">
          THE FASHION UPGRADE YOU'VE BEEN WAITING FOR.
        </h2>
        <CategoryCircleItems items={display} />
      </div>

      <div className="container pb-5">
      <div className="text-center pt-4">
        <h2 className="spaceHead pt-5 pb-4">WHAT'S NEW?</h2>
      </div>
        <Row>
          <Col xs={6}>
            <div className="wrapper">
            <button style={{ }}>
                <img className="img-fluid" src="https://cdn.omni.mrpg.com/cdn/01/content/2022/wk06/ladies_reel01.png" alt="" />
            </button>
            </div>
          </Col>
          <Col xs={6}>
          <div className="wrapper">
            <button style={{ }}>
                <img className="img-fluid" src="https://cdn.omni.mrpg.com/cdn/01/content/2022/wk06/ladies_reel02.png" alt="" />
            </button>
            </div>


          </Col>
        </Row>
      </div>

      <div className="container pb-5">
    

        <div className="text-center pt-4 pb-3">
          <h2 className="spaceHead pt-5 pb-4">THE FAVES YOU JUST HAVE TO OWN</h2>
        </div>
        <Row>
          <Col xs={4} className="pl-0 pr-0">
            <ProductCategory img="https://cdn.omni.mrpg.com/cdn/01/content/2022/wk06/ladies_callout03.png" link="Ladies/Shop by category/Dresses" />
          </Col>
          <Col xs={4} className="pl-0 pr-0">
          <ProductCategory img="https://cdn.omni.mrpg.com/cdn/01/content/2022/wk06/ladies_callout01.png" link="Ladies/Shop by category/Active tops" />
          </Col>
          <Col xs={4} className="pl-0 pr-0">
          <ProductCategory img="https://cdn.omni.mrpg.com/cdn/01/content/2022/wk05/03Mens_CO.png" link="Ladies/Shop by category/Fashion tops" />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Ladies;
