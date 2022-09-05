import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../store/SignUpSlice';

const RegisterPage = () => {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [passwordConfirm, setPasswordConfirm] = useState("");
const signUpInfo = useSelector((state) => state.signUp.signUpInfo);
const error = useSelector((state) => state.user.error);
const dispatch = useDispatch();
const navigate = useNavigate();

// useEffect(() => {
//   if (signUpInfo) {
//     navigate("/welcome");
//   }
//   return () => {};
// }, [signUpInfo, navigate]);

const nameHandler = (e) => {
  setName(e.target.value);
};
const emailHandler = (e) => {
  setEmail(e.target.value);
};

const passwordHandler = (e) => {
  setPassword(e.target.value);
};

const passwordConfirmHandler = (e) => {
  setPasswordConfirm(e.target.value);
};

const submitHandler = (e) => {
  e.preventDefault();
  dispatch(signup(name, email, password, passwordConfirm));
};

    return (
      <>
        <div className="go-back">
          <Link to={-1}>Go back</Link>
        </div>
        <div className="form">
          <form className="form-container" onSubmit={submitHandler}>
            <ul>
              <li>
                <h3>Create Account</h3>
              </li>
              <li>{error && <div>{error}</div>}</li>
              <li>
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="name"
                  name="name"
                  onChange={nameHandler}
                />
              </li>
              <li>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  onChange={emailHandler}
                />
              </li>
              <li>
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  onChange={passwordHandler}
                />
              </li>
              <li>
                <label htmlFor="passwordConfirm">Confirm Password</label>
                <input
                  id="passwordConfirm"
                  type="password"
                  name="passwordConfirm"
                  onChange={passwordConfirmHandler}
                />
              </li>
              <li>
                <button type="submit" className="button">
                  Sign Up
                </button>
              </li>
              <li>
                Already have an account?{" "}
                <Link to="/signin">Sign In</Link>
              </li>
            </ul>
          </form>
        </div>
      </>
    );
};

export default RegisterPage;