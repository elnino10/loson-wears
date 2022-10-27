import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import Cookie from "js-cookie";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: {},
    loading: false,
    isAuth: false,
    error: null,
  },
  reducers: {
    request(state, action) {
      state.loading = true;
      state.userInfo.email = action.payload.email;
      state.userInfo.password = action.payload.password;
    },

    success(state, action) {
      state.isAuth = true;
      state.userInfo = action.payload
    },

    fail(state, action) {
      state.error = action.payload;
    },
  },
});

export const signup = (name, email, password, passwordConfirm) => async (dispatch) => {
  dispatch(request(name, email, password, passwordConfirm));
  try {
      const { data } = await axios.post(
        "/api/users/signup", { name, email, password, passwordConfirm });
      const {user} = data.data  
        console.log(user);
      dispatch(success(user));
  } catch (error) {
      dispatch(fail(error.message))
  }
  
}

export const signin = (email, password) => async (dispatch) => {
  dispatch(request(email, password));
  try {
    const { data } = await axios.post("/api/users/login", { email, password });
    const { user } = data.data;
    console.log(user);
    dispatch(success(user));
  } catch (error) {
    console.log(error);
    let errorMsg = error.message.slice(0, 15).trim();
    dispatch(fail(errorMsg));
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.get(`/api/users/logout`);
    dispatch(success({}))
  } catch (error) {
    dispatch(fail(error.message))
  }
};

export const {
  request,
  success,
  fail,
} = userSlice.actions;

export default userSlice.reducer;
