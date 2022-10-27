import Product from "../models/productModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

// eslint-disable-next-line no-unused-vars
export const getAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find({});
  res.status(200).json({
    status: "success", 
    results: products.length,
    data: {
      products,
    },
  });
});
 
export const createProduct = catchAsync(async (req, res, next) => {
  const product = await Product.create({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image, 
    brand: req.body.brand,
    category: req.body.category,
    qtyInStock: req.body.qtyInStock,
    description: req.body.description
  });
  if (!product) {
    return next(new AppError("Could not create product!", 404));
  }
  res
    .status(201)
    .json({ status: "New Product Created", data: { product } });
});

export const getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate('reviews');
  if (!product) {
    return next(new AppError("No product found!", 404));
  }
  res.status(200).json({
    status: "success",
    data: { product },
  });
});

export const updateProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    return next(new AppError("No product found!", 404));
  }
  res.status(201).json({
    status: "success",
    data: { product },
  });
});

export const deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return next(new AppError("No product found!", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});
