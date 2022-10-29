/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import AppError from "../utils/appError.js";

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 404);
};

const handleDuplicateErrorDB = (err) => {
  const value = err.keyValue.name;
  const message = `Duplicate value ${value} already exists`;
  return new AppError(message, 404);
};

const handleValidationErrorDB = (err) => {
  const error = Object.values(err.errors).map((el) => el.message);
  const message = error.join(". ");
  return new AppError(message, 404);
};

const errorDev = (err, res) => {
  res.status(err.statusCode).json({
    name: err.name,
    error: err,
    message: err.message,
    stack: err.stack, 
  });
}; 

const errorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.log("ERROR!...", err);
  }
  res.status(err.statusCode).json({
    status: "error",
    message: "something went wrong",
  });
};

const ErrorController = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    errorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateErrorDB(error);
    if (error.name === "ValidationError")
      error = handleValidationErrorDB(error);
    errorProd(error, res);
  }
};

export default ErrorController;