import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const productReviewSlice = createSlice({
  name: "reviews",
  initialState: { reviews: [], success: false, loading: false, error: null },
  reducers: {
    productReviewRequest(state, action) {
      state.loading = true;
      state.reviews = action.payload;
    },
    productReviewSuccess(state, action) {
      state.success = true;
      state.reviews = action.payload;
    },
    productReviewFail(state, action) {
      state.error = action.payload;
    },
  },
});

export const {productReviewRequest, productReviewSuccess, productReviewFail} = productReviewSlice.actions


export const productReviewsAsync = (productId) => async (dispatch) => {
    try {
      dispatch(productReviewRequest(productId))
      const {data} = await axios.get(`/api/products/${productId}/reviews`)
      const reviews = data.data.reviews
      console.log(reviews);
      if(data) dispatch(productReviewSuccess(reviews))
    } catch (error) {
      dispatch(productReviewFail(error.message))
    }
    
  }

export default productReviewSlice.reducer;
