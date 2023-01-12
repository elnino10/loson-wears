import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import Cookie from "js-cookie";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: {},
    loading: false,
    isAuth: false,
    logout: false,
    error: null,
    authError: false,
  },
  reducers: {
    request(state) {
      state.loading = true;
    },

    success(state, action) {
      state.isAuth = true;
      state.userInfo = action.payload;
    },

    fail(state, action) {
      state.error = action.payload;
    },

    logoutUser(state){
      state.logout = true
    },

    hideErrorModal(state) {
      state.authError = false;
    },

    showErrorModal(state) {
      state.authError = true;
    },
  },
});

const baseURL = "http://127.0.0.1:5000"

export const signup =
  (name, email, password, passwordConfirm) => async (dispatch) => {
    try {
      dispatch(request());
      const { data } = await axios.post(`${baseURL}/api/users/signup`, {
        name,
        email,
        password,
        passwordConfirm,
      });
      const { user } = data.data;
      if (user) dispatch(success(user));
      Cookie.set("jwt", JSON.stringify(data), { expires: 3 });
    } catch (error) {
      const data = error.response.data;
      const message = data.message;
      if (data.error.code === 11000) {
        return dispatch(fail("Email already exists"));
      }
      const errMsg = message.split(",")[0].split(" ").slice(4).join(" ");
      dispatch(fail(errMsg));
    }
  };

export const signin = (email, password) => async (dispatch) => {
  try {
    dispatch(request());
    const { data } = await axios.post(`${baseURL}/api/users/login`, { email, password });
    const { user } = data.data;
    console.log(data);
    if (user) dispatch(success(user));
    Cookie.set("jwt", JSON.stringify(data), { expires: 3 });
  } catch (error) {
    const { message } = error.response.data;
    dispatch(fail(message));
  }
};

export const userDetailAsync = (userId) => async (dispatch) => {
  try {
    dispatch(request());
    const { data } = await axios.get(
      `${baseURL}/api/users/${userId}`
    ); 
    if (data) dispatch(success(data));
  } catch (error) {
    console.log(error.response.data);
    const { message } = error.response.data;
    dispatch(fail(message));
    dispatch(showErrorModal());
  }
};

export const updateUserInfoAsync = (name, email) => async (dispatch) => {
  try {
    dispatch(request());
    const { data } = await axios.patch(
      `${baseURL}/api/users/updateUser`,
      { name, email }
    );
    console.log(data);
  } catch (error) {
    console.log(error.response.data);
  }
};

export const logoutAsync = () => async (dispatch) => {
  try {
    dispatch(request())
    const data = await axios.get(`${baseURL}/api/users/logout`);
    dispatch(logoutUser())
    console.log(data);
  } catch (error) {
    const { message } = error.response.data;
    console.log(message);
    dispatch(fail(message));
    dispatch(showErrorModal())
  }
};

export const { request, success, fail, logoutUser, showErrorModal, hideErrorModal } =
  userSlice.actions;

export default userSlice.reducer;
