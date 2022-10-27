import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import productDetailReducer from "./productDetailSlice";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice";
import createProductReducer from "./createProductSlice";
import productReviewReducer from './productReviewSlice';

export default configureStore({
  reducer: {
    productList: productReducer,
    productDetail: productDetailReducer,
    productReviews: productReviewReducer,
    cart: cartReducer,
    user: userReducer,
    createProduct: createProductReducer
  },
});
