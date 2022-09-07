import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createProduct } from "../store/createProductSlice";

const CreateProduct = (props) => {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [image, setImage] = useState("")
  const [brand, setBrand] = useState("")
  const [category, setCategory] = useState("")
  const [qtyInStock, setQtyInStock] = useState("")
  const [description, setDescription] = useState("")

  const error = useSelector((state) => state.createProduct.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    return () => {};
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProduct({
        name,
        price,
        image,
        brand,
        category,
        qtyInStock,
        description,
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
            <li className="error">{error && <div>{error}</div>}</li>
            <li>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                name="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </li>
            <li>
              <label htmlFor="image">Image</label>
              <input
                id="image"
                type="text"
                name="image"
                onChange={(e) => setImage(e.target.value)}
                value={image}
              />
            </li>
            <li>
              <label htmlFor="price">Price</label>
              <input
                id="price"
                type="text"
                name="price"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </li>
            <li>
              <label htmlFor="brand">Brand</label>
              <input
                id="brand"
                type="text"
                name="brand"
                onChange={(e) => setBrand(e.target.value)}
                value={brand}
              />
            </li>
            <li>
              <label htmlFor="quantity">Quantity In Stock</label>
              <input
                id="quantity"
                type="text"
                name="quantity"
                onChange={(e) => setQtyInStock(e.target.value)}
                value={qtyInStock}
              />
            </li>
            <li>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                type="text"
                name="description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </li>
            <li>
              <label htmlFor="category">Category</label>
              <select
                id="category"
                type="text"
                name="category"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              >
                <option value="Ladies Wears">Ladies Wears</option>
                <option value="Kids Wears">Kids Wears</option>
                <option value="Men's Wears">Men's Wears</option>
              </select>
            </li>
            <li>
              <button type="submit" className="button full-width">
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
