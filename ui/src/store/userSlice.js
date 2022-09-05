import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import Cookie from "js-cookie";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: { email: null, password: null },
    loading: false,
    error: null,
  },
  reducers: {
    signinRequest(state) {
      state.loading = true;
    },

    signinSuccess(state, action) {
      state.userInfo = action.payload;
    },

    signinFail(state, action) {
      state.error = action.payload;
    },
  },
});

export const signin = (email, password) => async (dispatch) => {
  dispatch(signinRequest(email, password));
  try {
    const { data } = await axios.post("/api/users/signin", { email, password });
    dispatch(signinSuccess(data));
    Cookie.set("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch(signinFail(error.message));
  }
};

export const { signinRequest, signinSuccess, signinFail } = userSlice.actions;

export default userSlice.reducer;
