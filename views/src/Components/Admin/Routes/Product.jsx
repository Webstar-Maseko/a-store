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
  let [parent_id, setId] = useState("");
  let [dup, setDup] = useState([]);

  function getCategory() {
    axios
      .get("api/category/index")
      .then((res) => setCategory(res.data))
      .catch((err) => alert(err));
  }

  function getProducts() {
    axios
      .get("api/product/getProduct")
      .then((res) => {
        setProducts(() => res.data);
        setDup(() => res.data);
      })
      .catch((err) => alert(err));
  }
  function cateChange(e) {
    setId(e.target.value);
  }

  function tempCat(e) {
    let temp = [];
    console.log(e.target.value);

    dup = products;
    let dummy = dup;

    temp = dummy.filter((prod) => prod.category === e.target.value);

    if (e.target.value !== "") {
      setDup(temp);
    } else {
      getCategory();
    }
  }

  useEffect(getProducts, []);
  useEffect(getCategory, []);
  return (
    <div className="pt-5">
      <div className="text-left">
        <select name="parent" onChange={cateChange} id="">
          <option value="">Select category to filter by</option>
          {category.length > 0 &&
            category.map((item, index) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
        </select>

        <select name="child" onChange={tempCat}>
          <option value="">Select sub-category to filter by</option>
          {category.length > 0 &&
            category.map((item, index) => {
              let child = item.children.filter(
                (cat) => cat.parentId === parent_id
              );

              return child.map((kid, kidInde) => (
                <option key={kid._id} value={kid._id}>
                  {kid.name}
                </option>
              ));
            })}
        </select>
      </div>

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
          {dup.length > 0 &&
            dup.map((item, index) => (
              <tr key={item._id}>
                <td>{item.name} </td>
                <td>R{item.price}</td>
                <td>{item.quantity}</td>
                <td>{item.size}</td>
                <td>{item.description}</td>
                <td>
                  {category.map((cat, ind) =>
                    cat.children
                      .filter((child, a) => child._id === item.category)
                      .map((parent, b) => cat.name + " > " + parent.name)
                  )}
                </td>
                <td>
                  <Fab
                    onClick={() => {
                      let id = item._id;
                      console.log(id);
                      axios
                        .post("/api/product/delete", { id })
                        .then((res) => setProducts(() => res.data))
                        .catch((err) => alert(err));
                      setDup(products);
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
