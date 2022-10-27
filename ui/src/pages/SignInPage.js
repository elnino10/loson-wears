import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import { signin } from "../store/userSlice";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuth, error, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
    return () => {};
  }, [isAuth, navigate]);

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(signin(email, password));
    setEmail("");
    setPassword("");
  };

  let link = <Link to={-1}>Go back</Link>;
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
              <h3>Sign In</h3>
            </li>

            <li className="error">{error && <div>{error}</div>}</li>
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
              <button type="submit" className="button">
                Sign In
              </button>
            </li>
            <li>Don't have an account?</li>
            <li>
              <Link to="/register">Create Account</Link>
            </li>
          </ul>
        </form>
      </div>
    </>
  );
};

export default SignInPage;
