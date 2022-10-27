import express from "express"; 
import reviewRoute from "./reviewRoute.js";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "../controllers/productController.js";
import { restrictTo, secureLogin } from "../controllers/authController.js";

const router = express.Router();

router.use("/:productId/reviews", reviewRoute);

router.get("/", getAllProducts);
router.post("/create-product", secureLogin, restrictTo("admin"), createProduct);
router
  .route("/:id")
  .get(getProduct)
  .patch(secureLogin, restrictTo("admin"), updateProduct)
  .delete(secureLogin, restrictTo("admin"), deleteProduct);

export default router;
