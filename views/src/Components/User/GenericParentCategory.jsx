import { React, useState, useEffect } from "react";
import CategoryCircleItems from "../Utils/CategoryCircleItems";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ParentCategory from "../Utils/ParentCategory";
import {useDispatch, useSelector} from "react-redux";
import { getCategories } from "../Redux/store/slicers/CategorySlicer";


export default function GenericParentCategory() {
  let [categ, setCateg] = useState([]);
  let location = useLocation();
  const category = useSelector(state => state.category  )
  let lname = location.pathname.slice(1);
  const dispatch = useDispatch();


  useEffect(() =>{ dispatch(getCategories())
   }, [dispatch]);

   useEffect(() => {
     function locate(){
        setCateg(category.filter((cat) => cat.name === lname));
     }
     locate();
   },[category, lname])





  return (
    <div className="mt-4 pt-5">
      <div className="text-center">
        <div
         className="banner"
        >
        {categ.length > 0 ? <img className="" src={`${process.env.PUBLIC_URL}/Category/images/${categ[0].image}`} alt="testing updating" /> : <h1>{lname}</h1> }
       
        </div>
        <div className="text-center pt-2 pb-5">
          <p className="gePar">
            It’s about that time when you check in with us for a fresh drop of
            must haves with all the trends you’ll wanna be wearing.
          </p>

          <a href="" className="btn btn-outline-dark pl-5 pr-5">
            SHOP NOW
          </a>
        </div>
      </div>
      <div className="text-center">
        <h2 className="spaceHead pt-5 pb-4">SAY HI TO YOUR NEW MVPS...</h2>
        <CategoryCircleItems />
      </div>

      <div className="container">
        <Row>
          <Col md={6}></Col>
          <Col md={6}></Col>
        </Row>
      </div>
    </div>
  );
}
