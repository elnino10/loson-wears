import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const WelcomePage = () => {
  const { userInfo } = useSelector((state) => state.user);

  const name = `${userInfo.name}`;
  const userName = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <div>
      <h2>Welcome to Loson Stores {userName}</h2>
      <div>
        Go to our <Link to="/">Home Page</Link> to view products.
      </div>
    </div>
  );
};

export default WelcomePage;
