import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { products: [], loading: true, error: null };

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    productListRequest(state) {
      state.loading = false;
    },
    productListSuccess(state, action) {
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
    const { data } = await axios.get("/api/items");
    dispatch(productListSuccess(data));
  } catch (error) {
    dispatch(productListFail(error.message));
  }
};

export default productSlice.reducer;
