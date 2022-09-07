import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createProduct } from "../store/createProductSlice";

const CreateProduct = (props) => {
  const productRef = useRef();
  const {
    nameRef,
    priceRef,
    imageRef,
    brandRef,
    categoryRef,
    ratingRef,
    reviewsRef,
    qtyInStockRef,
    descriptionRef,
  } = productRef;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    return () => {};
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProduct({
        nameRef,
        priceRef,
        imageRef,
        brandRef,
        categoryRef,
        ratingRef,
        reviewsRef,
        qtyInStockRef,
        descriptionRef,
      })
    );
  };

  return (
    <>
      <div className="go-back">
        <Link to={-1}>Go back</Link>
      </div>
      <div className="form">
        <form className="form-container" onSubmit={submitHandler}>
          <ul>
            <li>
              <h3>Create Product</h3>
            </li>
            <li>{error && <div>{error}</div>}</li>
            <li>
              <label htmlFor="name">Name</label>
              <input id="name" type="text" name="name" ref={nameRef} />
            </li>
            <li>
              <label htmlFor="image">Image</label>
              <input id="image" type="text" name="image" ref={imageRef} />
            </li>
            <li>
              <label htmlFor="price">Price</label>
              <input id="price" type="text" name="price" ref={priceRef} />
            </li>
            <li>
              <label htmlFor="brand">Brand</label>
              <input id="brand" type="text" name="brand" ref={brandRef} />
            </li>
            <li>
              <label htmlFor="category">Category</label>
              <input
                id="category"
                type="text"
                name="category"
                ref={categoryRef}
              />
            </li>
            <li>
              <label htmlFor="rating">Rating</label>
              <input id="rating" type="text" name="rating" ref={ratingRef} />
            </li>
            <li>
              <label htmlFor="reviews">Reviews</label>
              <input id="reviews" type="text" name="reviews" ref={reviewsRef} />
            </li>
            <li>
              <label htmlFor="quantity">Quantity</label>
              <input
                id="quantity"
                type="text"
                name="quantity"
                ref={qtyInStockRef}
              />
            </li>
            <li>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                type="text"
                name="description"
                ref={descriptionRef}
              />
            </li>
            <li>
              <button type="submit" className="button">
                Create
              </button>
            </li>
          </ul>
        </form>
      </div>
    </>
  );
};

export default CreateProduct;
