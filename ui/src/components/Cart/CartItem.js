import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, increaseItem, decreaseItem } from "../../store/cartSlice";

import classes from "./CartItem.module.css";

const CartItem = (props) => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const increaseItemHandler = (item) => {
    dispatch(increaseItem(item));
  }

  const decreaseItemHandler = (itemId) => {
    dispatch(decreaseItem(itemId))
  }

  const removeItemHandler = (item) => {
    dispatch(removeFromCart(item))
  };

  return items.map((item) => (
    <li className={classes.item} key={item.id}>
      <header>
        <h3>{item.name}</h3>
        <div className={classes.price}>
          {item.amount}ngn{" "}
          <span className={classes.itemprice}>({item.price}ngn/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{item.quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={decreaseItemHandler.bind(null, item)}>-</button>
          <button onClick={increaseItemHandler.bind(null, item)}>+</button>
          <div onClick={removeItemHandler.bind(null, item)}>x</div>
        </div>
      </div>
    </li>
  ));
};

export default CartItem;
