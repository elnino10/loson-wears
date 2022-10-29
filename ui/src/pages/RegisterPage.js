import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import { signup } from "../store/userSlice";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isValid, setIsValid] = useState(false);
  const { isAuth, error, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate("/welcome");
    }
    return () => {};
  }, [isAuth, navigate]);

  useEffect(() => {
    setIsValid(true);
  }, []);

  const nameHandler = (e) => {
    setName(e.target.value);
    setIsValid(true);
  };
  const emailHandler = (e) => {
    setEmail(e.target.value);
    setIsValid(true);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
    setIsValid(true);
  };

  const passwordConfirmHandler = (e) => {
    setPasswordConfirm(e.target.value);
    setIsValid(true);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setIsValid(true);
    dispatch(signup(name, email, password, passwordConfirm));

    setIsValid(false);
    // setName("");
    // setEmail("");
    // setPassword("");
    // setPasswordConfirm("");
  };

  let link = <Link to={-1}>go back</Link>;
  if (loading && !error) {
    link = <LoadingIndicator />;
  }
  return (
    <>
      <div className="go-back">{link}</div>
      <div className="form">
        <form className="form-container" onSubmit={submitHandler}>
          <ul>
            <li>
              <h3>Create Account</h3>
            </li>
            <li className="error">{!isValid && <div>{error}</div>}</li>
            <li>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="name"
                name="name"
                onChange={nameHandler}
                value={name}
              />
            </li>
            <li>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                onChange={emailHandler}
                value={email}
              />
            </li>
            <li>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                onChange={passwordHandler}
                value={password}
              />
            </li>
            <li>
              <label htmlFor="passwordConfirm">Confirm Password</label>
              <input
                id="passwordConfirm"
                type="password"
                name="passwordConfirm"
                onChange={passwordConfirmHandler}
                value={passwordConfirm}
              />
            </li>
            <li>
              <button type="submit" className="button">
                Sign Up
              </button>
            </li>
            <li>
              Already have an account? <Link to="/signin">Sign In</Link>
            </li>
          </ul>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
