import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { User } from "../models/User.js";
import { sendToken } from "../utils/sendToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";

export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  //  const file = req.file;
  if (!name || !email || !password)
    return next(new ErrorHandler("Please fill all the fields", 400));

  let user = await User.findOne({ email });
  if (user) return next(new ErrorHandler("User already exists", 409));

  //upload file on cloudinary;
  user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "tempid",
      url: "tempurl",
    },
  });
  sendToken(res, user, "User Created Successfully", 201);
});

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  //  const file = req.file;
  if (!email || !password)
    return next(new ErrorHandler("Please fill all the fields", 400));

  const user = await User.findOne({ email }).select("+password");
  if (!user) return next(new ErrorHandler("User doesnot exists", 401));
  const isMatched = await user.comparePassword(password);
  if (!isMatched) return next(new ErrorHandler("Incorrect", 401));

  sendToken(res, user, `Welcome back, ${user.name}`, 200);
});

export const logout = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged out successfully",
    });
});

export const getMyProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({
    success: true,
    user,
  });
});

//this is for changing password
export const changePassword = catchAsyncError(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword)
    return next(new ErrorHandler("Please fill all the fields", 400));
  const user = await User.findById(req.user._id).select("+password");

  const isMatched = await user.comparePassword(oldPassword);
  if (!isMatched) return next(new ErrorHandler("Incorrect", 401));

  user.password = newPassword;

  await user.save();
  res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
});

//this is for updating profile

export const updateProfile = catchAsyncError(async (req, res, next) => {
  const { name, email } = req.body;

  const user = await User.findById(req.user._id);
  if (name) user.name = name;
  if (email) user.email = email;
  await user.save();
  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
  });
});

export const updateprofilepicture = catchAsyncError(async (req, res, next) => {
  //cloudinary to do
  res.status(200).json({
    success: true,
    message: "Profile picture updated successfully",
  });
});

export const forgotPassword = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return next(new ErrorHandler("User doesnot exists", 400));

  const resetToken = await user.getResetToken();
  //sendToken via email
  const url = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;
  await sendEmail(user.email, `Password reset password: ${url}`);

  res.status(200).json({
    success: true,
    message: `Reset token sent to ${user.email}`,
  });
});
export const resetPassword = catchAsyncError(async (req, res, next) => {
  //cloudinary to do
  res.status(200).json({
    success: true,
    message: "Profile picture updated successfully",
  });
});
