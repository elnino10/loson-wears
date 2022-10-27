import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ProfilePage = () => {
  const [user, setUser] = useState();
  const params = useParams();

  const getUserInfo = useCallback(async () => {
    const { data } = await axios.get(
      `http://127.0.0.1:5000/api/users/${params.userId}`
    );
    console.log(data);
    setUser(data);
  }, [params.userId]);

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);
  
  return (
    <>
      <div className="go-back">
        <Link to={-1}>go back</Link>
      </div>
      <div className="form">
        <form className="form-container">
          <ul>
            <li>
              <h3>My Profile</h3>
            </li>
            <li>
              <label htmlFor="name">Name</label>
              <input id="name" type="name" name="name" placeholder="name" />
            </li>
            <li>
              <label htmlFor="email">Email</label>
              <input id="email" type="email" name="email" placeholder="email" />
            </li>
            <li>
              <button type="submit" className="button">
                submit
              </button>
            </li>
            <li>
              Want to change your password?{" "}
              <Link to="/profile/change-password">Change Password</Link>
            </li>
          </ul>
        </form>
      </div>
    </>
  );
};

export default ProfilePage;
