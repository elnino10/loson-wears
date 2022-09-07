import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const createProductSlice = createSlice({
  name: "newProduct",
  initialState: { productDetail: {}, loading: false, error: null },
  reducers: {
    createProductRequest(state) {
      state.loading = true;
    },
    createProductSuccess(state, action) {
      state.productDetail = action.payload;
    },
    createProductFail(state, action) {
      state.error = action.payload;
    },
  },
});

export const createProduct = (product) => async (dispatch) => {
  try {
    dispatch(createProductRequest(product));
    const {
      userSignin: { userInfo },
    } = getState();
    const {data} = await axios.post("/api/items", product, {
      headers: {
        Authorization: "Bearer" + userInfo.token,
      },
    });
    dispatch(createProductSuccess(data));
  } catch (error) {
    dispatch(createProductFail(error.message))
  }
};

export const { createProductRequest, createProductSuccess, createProductFail } =
  createProductSlice.actions;

export default createProductSlice.reducer;
