/* eslint-disable no-unused-vars */
import User from "../models/userModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
 
const filterObj = (obj, ...fields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (fields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

export const getAllUsers = catchAsync(async (req, res, next) => {
  const allUsers = await User.find();

  res.status(200).json({
    status: "success",
    results: allUsers.length,
    data: { allUsers },
  });
});
 
export const getUser = catchAsync(async (req, res, next) => {
  const user = req.user

  if (!user) {
    return next(new AppError("No user found", 404));
  }
  res.status(200).json({
    status: "success",
    data: { user },
  });
});

export const updateUser = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. please use /updatePassword',
        400
      )
    );
  }
  // filtered out field names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email');
  // update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    data: { user: updatedUser },
  });
});

export const deleteUser = (catchAsync(async(req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user.id, {active: 'false'})

  if(!user){
    return next(new AppError('User not found!', 404))
  }

  res.status(204).json({
    status: 'success',
    data: null
  })
}))