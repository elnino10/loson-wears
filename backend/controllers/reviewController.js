import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import Review from "../models/reviewModel.js";

export const createReview = catchAsync(async (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  if (!req.body.product) req.body.product = req.params.productId;
  const review = await Review.create(req.body);
  if (!review) {
    return next(new AppError("Could not create a review", 404));
  }
  res.status(201).json({
    status: "success",
    data: { review },
  });
});

export const getAllReviews = catchAsync(async (req, res) => {
  let filteredProduct = {};
  if (req.params.productId) filteredProduct = { product: req.params.productId };
  const reviews = await Review.find(filteredProduct);
  res.status(200).json({
    status: "success",
    results: reviews.length,
    data: { reviews },
  });
});

export const getReview = catchAsync(async (req, res, next) => {
  const reviewId = req.params.reviewId;
  const review = await Review.findById(reviewId).populate("product");
  if (!review) {
    return next(new AppError("Review not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: { review },
  });
});

export const updateReview = catchAsync(async (req, res, next) => {
  const reviewId = req.params.reviewId;
  const updatedReview = await Review.findByIdAndUpdate(reviewId, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updatedReview) {
    return next(new AppError("Review not found", 404));
  }
  res.status(201).json({
    status: "success",
    data: { updatedReview },
  });
});

export const deleteReview = catchAsync(async (req, res, next) => {
  const review = await Review.findByIdAndDelete(req.params.reviewId);
  if (!review) {
    return next(new AppError("Review not delete review", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});
