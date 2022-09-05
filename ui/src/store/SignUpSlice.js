import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const SignUpSlice = createSlice({
  name: "Register",
  initialState: {
    signUpInfo: { email: null, password: null, passwordConfirm: null },
    loading: false,
    error: null,
  },
  reducers: {
    signUpRequest(state) {
      state.loading = true;
    },

    signUpSuccess(state, action) {
      state.userInfo = action.payload;
    },

    signUpFail(state, action) {
      state.error = action.payload;
    },
  },
});

export const signup = (email, password, passwordConfirm) => async (dispatch) => {
    dispatch(signUpRequest(email, password, passwordConfirm));
    try {
        const { data } = await axios.post(
          "/api/users/register", { email, password, passwordConfirm });
        dispatch(signUpSuccess(data));
    } catch (error) {
        dispatch(signUpFail(error.message))
    }
    
}

export const {signUpRequest, signUpSuccess, signUpFail} = SignUpSlice.actions;

export default SignUpSlice.reducer;