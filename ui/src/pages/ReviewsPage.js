import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import { productDetailAsync } from "../store/productDetailSlice";
import { productReviewsAsync } from "../store/productReviewSlice";

const ReviewsPage = () => {
  const { reviews, loading, error } = useSelector(
    (state) => state.productReviews
  );
  const { product } = useSelector((state) => state.productDetail);
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productReviewsAsync(params.productId));
    dispatch(productDetailAsync(params.productId))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

//   useEffect(() => {
//     dispatch(productDetailAsync(params.productId));
//   }, [dispatch, params.productId]);

  console.log(reviews);

  let content = (
    <div className="details">
      <div className="details-image">
        <img src={product.image} alt="product" />
      </div>
      <div className="details-info">
        <h4>Reviews for {product.name}</h4>
        <ul>
          {/* {reviews.map((review) => (
            <li key={review.id}>
              <div>{review.review}</div>
              <div>rating: {review.rating}</div>
              <div>review by: {review.user.name}</div>
            </li>
          ))} */}
        </ul>
      </div>
    </div>
  );

  if (loading && !reviews) content = <LoadingIndicator />;
  if (error) content = <p>{error.message}</p>;

  return (
    <div>
      <div className="go-back">
        <Link to={-1}>Go back</Link>
      </div>
      {content}
    </div>
  );
};

export default ReviewsPage;
