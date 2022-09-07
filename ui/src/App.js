import React from "react";
import { Routes, Route, Link, NavLink } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import SignInPage from "./pages/SignInPage";
import RegisterPage from "./pages/RegisterPage";
import CreateProduct from "./pages/CreateProduct";
import CartButton from "./components/Cart/CartButton";
import Cart from "./components/Cart/Cart";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./store/cartSlice";

function App() {
  const viewCart = useSelector((state) => state.cart.cartIsVisible);
  const signedIn = useSelector(state => state.user.success)
  const userInfo = useSelector(state => state.user.userInfo)
  const dispatch = useDispatch();

  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  };

  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  };

  const AddToCartHandler = (item) => {
    dispatch(addToCart(item));
  };

  return (
    <>
      {viewCart && <Cart />}
      <div className="container-grid">
        <header className="header">
          <div className="brand-name">
            <button onClick={openMenu}>&#9776;</button>
            <Link to="/">loson stores</Link>
          </div>
          <div className="header-links">
            {signedIn ? (
              <NavLink
                to="/profile"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {userInfo.name}
              </NavLink>
            ) : (
              <NavLink
                to="/signin"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Sign-In
              </NavLink>
            )}
            <CartButton />
          </div>
        </header>
        <aside className="sidebar">
          <h4 className="sidebar-header">Shopping Category</h4>
          <button onClick={closeMenu}>x</button>
          <ul className="shopping-category">
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
          {signedIn && (
            <div className="signout">
              <Link to="signout">Logout</Link>
            </div>
          )}
        </aside>
        <main className="main">
          <div className="products">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/create_product" element={<CreateProduct />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="/products/:productId"
                element={<ProductPage onAddItem={AddToCartHandler} />}
              />
            </Routes>
          </div>
        </main>
        <footer className="footer">All Rights Reserved.</footer>
      </div>
    </>
  );
}

export default App;
