import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import { logoutAsync } from "../store/userSlice";

const Logout = () => {
  const { logout, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(logoutAsync());
    if (logout) navigate("/");
  };

  return (
    <>
      {
        <div className="go-back">
          {loading && logout && <LoadingIndicator />}
        </div>
      }
      <div className="form">
        <form className="form-container" onSubmit={logoutHandler}>
          <div className="logout-header">
            <h3>Logging out</h3>
            <p className="error">Do you want to logout from this account?</p>
          </div>

          <ul className="logout-button">
            <li>
              <button type="submit" className="button">
                Yes
              </button>
            </li>
            <li>
              <Link to={-1} className="button-cancel button">
                Cancel
              </Link>
            </li>
          </ul>
        </form>
      </div>
    </>
  );
};

export default Logout;
