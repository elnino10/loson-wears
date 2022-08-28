import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { productListAsync } from "../store/productSlice";

const HomePage = () => {
  const products = useSelector((state) => state.productList.products);
  const loading = useSelector((state) => state.productList.loading);
  const error = useSelector((state) => state.productList.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productListAsync());
    return () => {};
  }, [dispatch]);

  return (
    <div className="products">
      {loading ? (
        <div>loading...</div>
      ) : error ? (
        { error }
      ) : (
        <ul className="items">
          {products.map((item) => (
            <li className="item" key={item.id}>
              <Link to={"products/" + item.id}>
                <img src={item.image} alt="item" className="item-image" />
              </Link>
              <div className="item-name">
                <Link to={"products/" + item.id}>{item.name}</Link>
              </div>
              <div className="item-brand">{item.brand}</div>
              <div className="item-price">{item.price} ngn</div>
              <div className="item-ratings">
                {item.rating} stars ({item.reviews})
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomePage;
