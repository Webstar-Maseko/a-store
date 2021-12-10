import { React, useState, useEffect } from "react";
import CategoryCircleItems from "../Utils/CategoryCircleItems";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ParentCategory from "../Utils/ParentCategory";

export default function GenericParentCategory() {
  const location = useLocation();
  let [category, setCategory] = useState([]);
  let [nCategory, setnCategory] = useState([]);
  let [object, setObject] = useState({});
  let lname = location.pathname.slice(1);
  // console.log(lname);

  function getCategory() {
    axios
      .get("api/category/index")
      .then((res) => setCategory(res.data))
      .catch((err) => alert(err));
  }
  useEffect(getCategory, []);

  function filterC() {
    setnCategory(() => {
      category.filter((item, index) => item.name === lname);
    });

    //return nCategory;
  }

  useEffect(filterC, [nCategory]);

  return (
    <div className="mt-5 pt-5">
      <div className="text-center">
        <div
          className="bgh text-center"
          // style={{
          //   backgroundImage: `url(${process.env.PUBLIC_URL}/Category/images/${object.image}`,
          // }}
        >
          {" "}
          {nCategory.length}{" "}
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
