import { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import AddProduct from "./Modals/AddProduct";
import Fab from "@material-ui/core/Fab";
import DeleteIcon from "@material-ui/icons/Delete";

const Product = () => {
  let [products, setProducts] = useState([]);
  let [category, setCategory] = useState([]);
  let [showModal, setShow] = useState(false);

  function getCategory() {
    axios
      .get("api/category/index")
      .then((res) => setCategory(res.data))
      .catch((err) => alert(err));
  }

  function getProducts() {
    axios
      .get("api/product/getProduct")
      .then((res) => setProducts(() => res.data))
      .catch((err) => alert(err));
  }

  useEffect(getProducts, []);
  useEffect(getCategory, []);
  return (
    <div className="pt-5">
      <div className="text-right pb-3">
        <Button onClick={() => setShow(true)}>Add Product</Button>
      </div>

      <AddProduct show={showModal} onHide={() => setShow(false)} />

      <Table striped className="pt-5">
        <thead>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Size</th>
          <th>Description</th>
          <th>Category</th>
        </thead>
        <tbody>
          {products.length > 0 &&
            products.map((item, index) => (
              <tr key={item._id}>
                <td>{item.name} </td>
                <td>R{item.price}</td>
                <td>{item.quantity}</td>
                <td>{item.size}</td>
                <td>{item.description}</td>
                <td>
                  {category.map((cat, ind) =>
                    cat.children
                      .filter((child, a) => child._id == item.category)
                      .map((parent, b) => cat.name +  " > " + parent.name)
                  )}
                </td>
                <td>
                  <Fab
                    onClick={() => {
                      let id = item._id;
                      axios
                        .post("/api/product/deleteProduct", { id })
                        .then((res) => setProducts(() => res.data))
                        .catch((err) => alert(err));
                    }}
                  >
                    <DeleteIcon />
                  </Fab>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Product;
