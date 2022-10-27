import { createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const initialState = {
  product: {},
  success: false,
  loading: false,
  error: null,
};

const productDetailSlice = createSlice({
  name: "product-detail",
  initialState,
  reducers: {
    productDetailtRequest(state, action) {
      state.loading = true;
      state.product = action.payload 
    },
    productDetailSuccess(state, action) {
      state.success = true;
      state.product = action.payload;
    },
    productDetailFail(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  productDetailtRequest,
  productDetailSuccess,
  productDetailFail,
} = productDetailSlice.actions;

export const productDetailAsync = (productId) => async (dispatch) => {
  try {
    dispatch(productDetailtRequest(productId));
    const { data } = await axios.get(`/api/products/${productId}`);
    const product = data.data.product
    if(product) dispatch(productDetailSuccess(product));
  } catch (error) {
    dispatch(productDetailFail(error.message));
  }
}; 

export default productDetailSlice.reducer;
