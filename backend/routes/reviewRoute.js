import express from "express";
import { restrictTo, secureLogin } from "../controllers/authController.js";
import {
  createReview,
  deleteReview,
  getAllReviews,
  getReview,
  updateReview,
  //   getAllReviews,
} from "../controllers/reviewController.js";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(secureLogin, restrictTo("user"), createReview)
  .get(getAllReviews);
router
  .route("/:reviewId")
  .get(getReview)
  .patch(secureLogin, restrictTo("user"), updateReview)
  .delete(secureLogin, restrictTo("user"), deleteReview);

export default router;
