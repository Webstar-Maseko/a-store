import { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import AddProduct from "./Modals/AddProduct";
import Fab from "@material-ui/core/Fab";
import DeleteIcon from "@material-ui/icons/Delete";
import { useSelector,useDispatch } from "react-redux";
import { getCategories } from "../../../Redux/store/slicers/CategorySlicer";
import { DeleteProduct, GetProduct } from "../../../Redux/store/slicers/ProductSlicer";

const Product = (props) => {
  let [showModal, setShow] = useState(false);
  let [parent_id, setId] = useState("");
  let [dup, setDup] = useState([]);

  const dispatch = useDispatch();

  const {isLoggedIn} = useSelector(state => state.adminUser);
  const category = useSelector(state => state.category);
  const products = useSelector(state => state.products)
  


  function getCategory() {
    dispatch(getCategories())
  }

  function getProducts() {
  dispatch(GetProduct())
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
  useEffect(() => {
    function check() {
      !isLoggedIn && props.history.push("/admin/login");
    }
    check();
  });
  useEffect(getProducts, [dispatch]);
  useEffect(getCategory, [dispatch]);

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

      <div className="text-end pb-3">
        <Button onClick={() => setShow(true)}>Add Product</Button>
      </div>

      <AddProduct show={showModal} onHide={() => setShow(false)} />

      <Table striped className="pt-5">
        <thead>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Sizes</th>
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
                <td>{item.size.join()}</td>
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
                      dispatch(DeleteProduct(id));
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
