import express from "express";
import {
  getAllUsers,
  updateUser,
  getUser,
  deleteUser,
} from "../controllers/userController.js";
import {
  createAdmin,
  createUser,
  loginUser,
  secureLogin,
  restrictTo,
  updateUserPassword,
  forgotPassword,
  resetPassword,
  logoutUser,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/signup", createUser);
router.post("/createAdmin", createAdmin);
router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:token", resetPassword);

router.use(secureLogin);

router.get("/", restrictTo("admin"), getAllUsers);
router.route("/:id").get(getUser);
router.patch("/updateUser", updateUser);
router.patch("/updatePassword", updateUserPassword);
router.get("/logout", logoutUser);
router.delete("/deleteUser", deleteUser);

export default router;
