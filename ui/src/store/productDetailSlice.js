import { createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const initialState = { product: {}, loading: true, error: null };

const productDetailSlice = createSlice({
  name: "product-detail",
  initialState,
  reducers: {
    productDetailtRequest(state, action) {
      state.loading = false;
    },
    productDetailSuccess(state, action) {
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
    const { data } = await axios.get("/api/items/" + productId);
    dispatch(productDetailSuccess(data));
  } catch (error) {
    dispatch(productDetailFail(error.message));
  }
};

export default productDetailSlice.reducer;
