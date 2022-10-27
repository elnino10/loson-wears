import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import { productListAsync } from "../store/productSlice";

const HomePage = () => {
  const { products, loading, error } = useSelector(state => state.productList);
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(productListAsync())
  },[dispatch])

  let content = (
    <ul className="items">
      {products.map((item) => (
        <li className="item" key={item._id}>
          <Link to={"products/" + item._id}>
            <img src={item.image} alt="item" className="item-image" />
          </Link>
          <div className="item-name">
            <Link to={"products/" + item._id}>{item.name}</Link>
          </div>
          <div className="item-brand">{item.brand}</div>
          <div className="item-price">{item.price} ngn</div>
          <div className="item-ratings">
            {item.rating} stars ({item.reviews})
          </div>
        </li>
      ))}
    </ul>
  );
  if (loading && !products) {
    content = <LoadingIndicator />;
  }
  if (error) {
    content = <h3>Ooops!... Something went wrong</h3>;
  }
  if (!loading && !products && !error) {
    content = <h3>No products found!</h3>;
  }

  return <div className="products">{content}</div>;
};

export default HomePage;
