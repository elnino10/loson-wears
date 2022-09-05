import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import classes from "./CartButton.module.css";

import { showCart } from "../../store/cartSlice";

const CartButton = (props) => {
  const number = useSelector(state => state.cart.totalQuantity)
  const dispatch = useDispatch();

  const showCartHandler = () => {
    dispatch(showCart());
  };

  return (
    <button className={classes.button} onClick={showCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{number}</span>
    </button>
  );
};

export default CartButton;
