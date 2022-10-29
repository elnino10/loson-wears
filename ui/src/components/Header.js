import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import CartButton from "./Cart/CartButton";
const Header = (props) => {
  const signedIn = useSelector((state) => state.user.isAuth);
  const { userInfo } = useSelector((state) => state.user);

  
  const name = `${userInfo.name}`;
  const userName = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <div className="container-grid">
      <header className="header">
        <div className="brand-name">
          <button onClick={props.onToggleMenu}>&#9776;</button>
          <Link to="/">loson stores</Link>
        </div>
        <div className="header-links">
          {signedIn ? (
            <NavLink
              to={`/my-profile/${userInfo._id}`}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {`Welcome ${userName}`}
            </NavLink>
          ) : (
            <NavLink
              to="/signin"
              onClick={props.onCloseMenu}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Sign In
            </NavLink>
          )}
          <CartButton />
        </div>
      </header>
      <aside className="sidebar">
        <h4 className="sidebar-header">Shopping Category</h4>
        <button onClick={props.onCloseMenu}>x</button>
        <ul className="shopping-category" onClick={props.onCloseMenu}>
          <li>
            <a href="index.html">Kids' Wears</a>
          </li>
          <li>
            <a href="index.html">Ladies' Wears</a>
          </li>
          <li>
            <a href="index.html">Men's Wears</a>
          </li>
        </ul>
        <div className="signout" onClick={props.onCloseMenu}>
          {signedIn ? (
            <Link to="/logout">Logout</Link>
          ) : (
            <Link to="/signin">Sign In</Link>
          )}
        </div>
      </aside>
    </div>
  );
};

export default Header;
