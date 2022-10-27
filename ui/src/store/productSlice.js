import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  success: false,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productListRequest(state) {
      state.loading = true;
    },
    productListSuccess(state, action) {
      state.success = true;
      state.products = action.payload;
    },
    productListFail(state, action) {
      state.error = action.payload;
    },
  },
});

export const { productListRequest, productListSuccess, productListFail } =
  productSlice.actions;

export const productListAsync = () => async (dispatch) => {
  try {
    dispatch(productListRequest());
    const { data } = await axios.get("/api/products");
    const products = data.data.products
    if(data) dispatch(productListSuccess(products));
  } catch (error) {
    dispatch(productListFail(error.message));
  }
};

export default productSlice.reducer;
