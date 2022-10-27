import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import SignInPage from "./pages/SignInPage";
import RegisterPage from "./pages/RegisterPage";
import CreateProduct from "./pages/CreateProduct";
import Cart from "./components/Cart/Cart";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./store/cartSlice";
import Header from "./components/Header";
import LogoutPage from "./pages/LogoutPage";
import WelcomePage from "./pages/WelcomePage";
import ProfilePage from "./pages/ProfilePage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import ReviewsPage from "./pages/ReviewsPage";

function App() {
  const viewCart = useSelector((state) => state.cart.cartIsVisible);
  const dispatch = useDispatch();

  const AddToCartHandler = (item) => {
    dispatch(addToCart(item));
  };

  let toggled = false;
  const toggleMenu = () => {
    document.querySelector(".sidebar").classList.toggle("open");
    if (toggled) {
      toggled = !toggled;
    }
  };

  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
    toggled = false;
  };

  return (
    <>
      {viewCart && <Cart />}
      <div className="container-grid">
        <Header onToggleMenu={toggleMenu} onCloseMenu={closeMenu} />
        <main className="main" onClick={closeMenu}>
          <div className="products">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/welcome" element={<WelcomePage />} />
              <Route path="/profile/:userId" element={<ProfilePage />} />
              <Route
                path="/profile/change-password"
                element={<ChangePasswordPage />}
              />
              <Route path="/create_product" element={<CreateProduct />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/logout" element={<LogoutPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="/products/:productId"
                element={<ProductPage onAddItem={AddToCartHandler} />}
              />
              <Route path="/product-reviews/:productId" element={<ReviewsPage />} />
            </Routes>
          </div>
        </main>
        <footer className="footer">All Rights Reserved.</footer>
      </div>
    </>
  );
}

export default App;
