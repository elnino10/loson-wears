import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import productDetailReducer from "./productDetailSlice";
import cartReducer from "./cartSlice";

export default configureStore({
  reducer: {
    productList: productReducer,
    productDetail: productDetailReducer,
    cart: cartReducer
  },
});
