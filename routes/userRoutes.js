import express from "express";
import {
  login,
  register,
  logout,
  getMyProfile,
  changePassword,
  updateProfile,
  updateprofilepicture,
  forgotPassword,
  resetPassword,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();

// to register a user
router.route("/register").post(register);
//login
router.route("/login").post(login);

//logout
router.route("/logout").get(logout);
//get my profile
router.route("/me").get(isAuthenticated, getMyProfile);
//changepassword
router.route("/changepassword").put(isAuthenticated, changePassword);
//updateProfile
router.route("/updateprofile").put(isAuthenticated, updateProfile);

//UpdateProfilePic
router
  .route("/updateprofilepicture")
  .put(isAuthenticated, updateprofilepicture);

//forgotpassword
router.route("/forgotpassword").post(forgotPassword);

//resetpassword
router.route("/resetpassword/:token").put(resetPassword);
//add to playlist
//remove from playlist

export default router;
