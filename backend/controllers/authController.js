import crypto from "crypto";
import promisify from "util-promisify";
import jwt from "jsonwebtoken";
import AppError from "../utils/appError.js";
import User from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";
// import getToken from "../utils/getToken.js";
import config from "../config.js";
import sendEmail from "../utils/email.js";

const createToken = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRES_IN,
  });
  const cookieOptions = {
    expires: new Date(Date.now() + config.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  if (config.NODE_ENV === "production") cookieOptions.secure = true;
  res.cookie("jwt", token, cookieOptions);
  user.password = undefined;
  user.active = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

export const createUser = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body;
  const newUser = await User.create({
    name,
    email,
    password,
    passwordConfirm,
  });

  if (!newUser) {
    return next(new AppError("Failed to create user!", 404));
  }
  createToken(newUser, 201, res);
});

export const loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password", 404));
  }
  const userSignin = await User.findOne({ email }).select("+password");

  // if(!userSignin.active) return next(new AppError('User no longer exists!', 404));

  if (
    !userSignin ||
    !(await userSignin.checkPassword(password, userSignin.password))
  ) {
    return next(new AppError("Incorrect email or password!", 400));
  }
  createToken(userSignin, 201, res);
});

export const logoutUser = (req, res) => {
  res.cookie("jwt", "loggedOut", {
    expires: new Date(Date.now() + 5 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};

export const createAdmin = catchAsync(async (req, res, next) => {
  const user = await User.create({
    name: "Administrator",
    email: "admin@admin.com",
    password: "pass1234",
    passwordConfirm: "pass1234",
    role: "admin",
  });

  if (!user) {
    return next(new AppError("Failed to create admin", 404));
  }
  createToken(user, 201, res);
});

export const secureLogin = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(new AppError("Unauthorized!. Please log in to access...", 401));
  }

  const decoded = await promisify(jwt.verify)(token, config.JWT_SECRET);

  const verifiedUser = await User.findById(decoded.id);
  if (!verifiedUser) {
    return next(new AppError("User does not exist.", 401));
  }

  if (verifiedUser.changedPassword(decoded.iat)) {
    return next(new AppError("Password changed, please log in again", 401));
  }

  req.user = verifiedUser;
  next();
});

export const restrictTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You are not permitted to take this action", 403)
      );
    }
    next();
  };

export const forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return next(new AppError("Please provide email address", 404));
  }
  // get user based on POSTed email
  const user = await User.findOne({ email });
  if (!user) {
    next(new AppError("No user with this email address", 404));
  }
  // generate random reset token
  const resetToken = await user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // send generated token to user's email
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/users/resetPassword/${resetToken}`;

  const message = `Forgot your password? Use the link below to reset your password.
  \n${resetURL}\n
  If you are not the one taking this action please ignore this message.`;

  try {
    await sendEmail({
      email: user.email /* from req.body.email */,
      subject: `Password reset token (expires in 10 minutes)`,
      message,
    });

    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.save({ validateBeforeSave: false });

    return new AppError(
      "Error occured while sending email. Please try again later",
      500
    );
  }
});

export const resetPassword = catchAsync(async (req, res, next) => {
  // Get user based on token
  const resetToken = req.params.token;
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // check if user token has expired
  if (!user) {
    return next(new AppError("Token is invalid or expired!", 400));
  }

  // reset and save password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // update passwordChangedAt

  // log user in by sending jwt
  createToken(user, 201, res);
});

export const updateUserPassword = catchAsync(async (req, res, next) => {
  // get user from collection
  const user = await User.findById(req.user._id).select("+password");
  if (!user) {
    return next(new AppError("User Not Found!", 404));
  }
  // check if POSTed password is correct
  const { passwordCurrent } = req.body;
  if (!(await user.checkPassword(passwordCurrent, user.password))) {
    return next(new AppError("Password is incorrect. Please try again", 401));
  }
  // update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  // log user in
  const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRES_IN,
  });

  user.password = undefined;
  res.status(201).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
});

// export const isAdmin = (req, res, next) => {
//   if (req.user && req.user.isAdmin) {
//     return next();
//   }
//   return res.status(401).send({ msg: "Admin Token Not Valid" });
// };
