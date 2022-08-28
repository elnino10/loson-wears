import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import CartButton from "./components/Cart/CartButton";
import Cart from "./components/Cart/Cart";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./store/cartSlice";

function App() {
  const viewCart = useSelector((state) => state.cart.cartIsVisible);
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
            <a href="login">Sign-In</a>
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
        </aside>
        <main className="main">
          <div className="products">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/products/:productId"
                element={<ProductsPage onAddItem={AddToCartHandler} />}
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
