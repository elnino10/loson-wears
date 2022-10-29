import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { updateUserInfoAsync, userDetailAsync } from "../store/userSlice";

const ProfilePage = () => {
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const { userInfo } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(userDetailAsync(params.userId));
  }, [dispatch, params]);

  const nameChangeHandler = (e) => {
    setNameInput(e.target.value);
  };

  const emailChangeHandler = (e) => {
    setEmailInput(e.target.value);
  };

  const submitUpdateHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserInfoAsync(nameInput, emailInput));
  };

  const name = `${userInfo.name}`;
  const userName = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <>
      <div className="go-back">
        <Link to={-1}>Go back</Link>
      </div>
      <div className="form">
        <form className="form-container" onSubmit={submitUpdateHandler}>
          <ul>
            <li>
              <h3>My Profile</h3>
            </li>
            <li>
              <label htmlFor="name">Name: {userName}</label>
              <input
                id="name"
                type="name"
                name="name"
                placeholder="edit name"
                onChange={nameChangeHandler}
              />
            </li>
            <li>
              <label htmlFor="email">Email: {userInfo.email}</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="change email"
                onChange={emailChangeHandler}
              />
            </li>
            <li>
              <button type="submit" className="button">
                submit
              </button>
            </li>
            <li>
              <Link to="/my-profile/change-password">Change Password</Link>
            </li>
            <li><Link to="/logout">Logout</Link></li>
          </ul>
        </form>
      </div>
    </>
  );
};

export default ProfilePage;
