import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Input from "@material-ui/core/Input";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import {useState} from "react";
import { adddToCart } from "../Redux/store/slicers/CartSlicer";
import {useDispatch} from "react-redux";


const ProductDetailsCard = (props) =>{
  let [quantity, setQuantiy] = useState(1);
  let [radioValue, setRadioValue] = useState("");
  const dispatch = useDispatch();


  const IncreaseQuantiy = () => {
    setQuantiy(() => {
      if (quantity < 5) return (quantity += 1);
      else {
        return 5;
      }
    });
  };
  const DecreaseQuantiy = () => {
    setQuantiy(() => {
      if (quantity > 0) return (quantity -= 1);
      else {
        return 0;
      }
    });
  };

  const QuantityChange = (e) => {
    setQuantiy(e.target.value === "" ? "" : Number(e.target.value));
  };

  const handleBlur = () => {
    if (quantity < 0) setQuantiy(0);
    else if (quantity > 5) {
      setQuantiy(5);
    }
  };

  const handleRadioChange = (e) => {
    setRadioValue(() => e.target.value);
  };

  const handleClick = () => {
    let cart = {};

    cart.id = props.id;
    cart.sku = props.sku;
    cart.color = props.color;
    cart.quantity = quantity;
    cart.size = radioValue;
    cart.price = props.price;

    dispatch(adddToCart(cart))
    console.log(cart);
  };


    return ( <Card>
        <CardContent>
          <label>SKU: 123459678</label>
          <label className="d-block mt-3">
            Color: {props.color}{" "}
          </label>
          <ToggleButton
            type="radio"
            checked={true}
            value={props.color}
            className="custom-rad"
          ></ToggleButton>
          <label className="d-block mt-3">Size: {radioValue} </label>
          <ButtonGroup toggle>
            {props.size &&
              props.size.map((size, index) => (
                <ToggleButton
                  key={index}
                  type="radio"
                  checked={radioValue === size}
                  onChange={handleRadioChange}
                  value={size}
                  variant={
                    radioValue === size
                      ? "secondary"
                      : "secondary-outline"
                  }
                  className="mr-3 custom-rad "
                >
                  {size}
                </ToggleButton>
              ))}
          </ButtonGroup>

          <label htmlFor="" className="d-block mt-3">
            Quantity:
          </label>

          <div className="pb-3">
            <button onClick={DecreaseQuantiy} className="quantity mr-2">
              <AiOutlineMinus />
            </button>
            <Input
              id="custom-input3"
              inputProps={{ step: 1, min: 1, max: 5, type: "number" }}
              type="text"
              value={quantity}
              onChange={QuantityChange}
              onBlur={handleBlur}
            />
            <button onClick={IncreaseQuantiy} className="quantity ml-2">
              <AiOutlinePlus />
            </button>
          </div>

          <div className="text-center mt-3">
            <label className="itemlabel">Availability: </label>
            <label className="itemlabel text-danger font-weight-bold">
              {" "}
              In stock. Bag it now!
            </label>
            <button
              onClick={handleClick}
              disabled={radioValue === ""? true:false}
              className="btn btn-danger btn-block text-center pt-3 pb-3"
            >
              ADD TO BAG
            </button>
          </div>
        </CardContent>
      
      </Card>);


}
export default ProductDetailsCard;