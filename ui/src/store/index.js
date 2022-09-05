import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import productDetailReducer from "./productDetailSlice";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice";
import signUpReducer from "./SignUpSlice";

export default configureStore({
  reducer: {
    productList: productReducer,
    productDetail: productDetailReducer,
    cart: cartReducer,
    user: userReducer,
    signUp: signUpReducer,
  },
});
