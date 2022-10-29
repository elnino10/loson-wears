import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import { addToCart } from "../store/cartSlice";
import { productDetailAsync } from "../store/productDetailSlice";

const ProductsPage = () => {
  const { product, loading, error } = useSelector(
    (state) => state.productDetail
  );
  const params = useParams();
  const dispatch = useDispatch();
  const qtyRef = useRef();
  const picked = useSelector((state) => state.cart.itemPicked);

  useEffect(() => {
    dispatch(productDetailAsync(params.productId));
    return () => {};
  }, [dispatch, params.productId]);

  const AddToCartHandler = () => {
    const itemQuantity = qtyRef.current.value;
    dispatch(
      addToCart({
        name: product.name,
        id: product.id,
        price: product.price,
        quantity: itemQuantity,
      })
    );
  };

  let content = (
    <div className="details">
      <div className="details-image">
        <img src={product.image} alt="product" />
      </div>
      <div className="details-info">
        <ul>
          <li>
            <h4>{product.name}</h4>
          </li>
          <li>
            {product.ratingsAverage} stars ({product.ratingsQuantity} Reviews){" "}
            <Link to={`/product-reviews/${product.id}`}>see reviews...</Link>
          </li>
          <li>
            Price: <b>{product.price}</b> ngn
          </li>
          <li>
            Description:
            <div>{product.description}</div>
          </li>
        </ul>
      </div>
      <div className="details-action">
        <ul>
          <li>Price: {product.price} ngn</li>
          <li>Status: {product.qtyInStock > 0 ? "In Stock" : "Unavailable"}</li>
          <li>
            Qty:{" "}
            <select ref={qtyRef} disabled={picked ? true : false}>
              {[...Array(product.qtyInStock).keys()].map((x) => (
                <option key={product.id + `q${x + 1}`} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </select>
          </li>
          {!picked ? (
            <li>
              {product.qtyInStock > 0 && (
                <button className="button" onClick={AddToCartHandler}>
                  Add to Cart
                </button>
              )}
            </li>
          ) : (
            <p>{product.name} Added To Cart!</p>
          )}
        </ul>
      </div>
    </div>
  );
  if (loading && !product) content = <LoadingIndicator />;
  if (error) content = <p>{error.message}</p>;

  return (
    <div>
      <div className="go-back">
        <Link to="/">go back</Link>
      </div>
      {content}
    </div>
  );
};

export default ProductsPage;
