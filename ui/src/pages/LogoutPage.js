import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/userSlice";

const Logout = () => {
  const loggedOut = useSelector((state) => state.user.success);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (loggedOut) {
      navigate("/");
    }
  }, [loggedOut, navigate]);

  const cancelLogoutHandler = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="go-back"></div>
      <div className="form">
        <form className="form-container">
          <div className="logout-header">
            <h3>Logging out</h3>
            <p className="error">Do you want to logout from this account?</p>
          </div>

          <ul className="logout-button">
            <li>
              <button type="submit" className="button" onClick={logoutHandler}>
                Yes
              </button>
            </li>
            <li>
              <button
                type="submit"
                className="button-cancel button"
                onClick={cancelLogoutHandler}
              >
                Cancel
              </button>
            </li>
          </ul>
        </form>
      </div>
    </>
  );
};

export default Logout;
