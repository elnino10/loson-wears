import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { productDetailAsync } from "../store/productDetailSlice";

const ProductsPage = (props) => {
  const qtyRef = useRef();
  const params = useParams();
  const item = useSelector((state) => state.productDetail.product);
  const loading = useSelector((state) => state.productDetail.loading);
  const error = useSelector((state) => state.productDetail.error);
  const picked = useSelector((state) => state.cart.itemPicked);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productDetailAsync(params.productId));
    return () => {};
  }, [dispatch, params.productId]);

  const AddToCartHandler = () => {
    const itemQuantity = qtyRef.current.value;
    props.onAddItem({
      name: item.name,
      id: item.id,
      price: item.price,
      quantity: itemQuantity,
    });
  };

  return (
    <div>
      <div className="go-back">
        <Link to="/">Go back</Link>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="details">
          <div className="details-image">
            <img src={item.image} alt="product" />
          </div>
          <div className="details-info">
            <ul>
              <li>
                <h4>{item.name}</h4>
              </li>
              <li>
                {item.rating} stars ({item.reviews} Reviews)
              </li>
              <li>
                Price: <b>{item.price}</b> ngn
              </li>
              <li>
                Description
                <div>{item.description}</div>
              </li>
            </ul>
          </div>
          <div className="details-action">
            <ul>
              <li>Price: {item.price} ngn</li>
              <li>
                Status: {item.qtyInStock > 0 ? "In Stock" : "Unavailable"}
              </li>
              <li>
                Qty:{" "}
                <select ref={qtyRef} disabled={picked ? true : false}>
                  {[...Array(item.qtyInStock).keys()].map((x) => (
                    <option key={item.id + `q${x + 1}`} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </li>
              {!picked ? (
                <li>
                  {item.qtyInStock > 0 && (
                    <button className="button" onClick={AddToCartHandler}>
                      Add to Cart
                    </button>
                  )}
                </li>
              ) : (
                <p>{item.name} Added To Cart!</p>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
