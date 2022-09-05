import classes from "./Cart.module.css";
import CartItem from "./CartItem";

import Modal from "../UI/Modal";
import { useDispatch, useSelector } from "react-redux";
import { hideCart } from "../../store/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const total = useSelector((state) => state.cart.totalAmount);
  const quantity = useSelector((state) => state.cart.totalQuantity);
  const userInfo = useSelector(state => state.user.userInfo)

  const hideCartHandler = () => {
    dispatch(hideCart());
  };

  const checkoutHandler = () => {
    if (userInfo) {
      navigate('/checkout');
    } else {
      navigate("/signin");
    }
    dispatch(hideCart());
  };

  let cartHeader = (
    <h3>{`Your Shopping Cart Item${quantity > 1 ? "s" : ""}`}</h3>
  );
  if (quantity < 1) {
    cartHeader = <h3>Shopping Cart is empty</h3>;
  }

  return (
    <Modal className={classes.cart}>
      <div className={classes["cart-header"]}>
        {cartHeader}
        <div className={classes["close-cart"]} onClick={hideCartHandler}>
          x
        </div>
      </div>
      <div className={classes["cart-item"]}>
        <ul>
          <CartItem />
        </ul>
        <div className={classes.total}>
          <div></div>
          <div>
            <h4>Total Amount</h4>
            <h4>{total} ngn</h4>
          </div>
        </div>
      </div>
      <div className={classes.checkout}>
        {quantity > 0 ? (
          <button onClick={checkoutHandler}>Proceed to checkout</button>
        ) : (
          ""
        )}
      </div>
    </Modal>
  );
};

export default Cart;
