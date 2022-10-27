import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product must have a name"],
      trim: true,
    },
    image: { type: String, required: [true, "Product must have an image"] },
    brand: { type: String, required: [true, "Brand name is required"] },
    price: {
      type: Number,
      default: 0,
      required: [true, "Product price is required"],
    },
    category: {
      type: String,
      required: [true, "Product must have category"],
      lowercase: true,
      enum: {
        values: ["kids", "ladies", "men"],
        message: "Category is either 'Kids', 'Ladies', or 'Men'",
      },
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
    },
    ratingsAverage: {
      type: Number,
      default: 3,
      min: [1, "Rating must not be less than 1"],
      max: [5, "Rating must not be greater than 5"],
      set: (val) => Math.round(val * 10) / 10,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    qtyInStock: {
      type: Number,
      default: 0,
      required: [true, "Quantity in stock is required"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
// virtual populate
productSchema.virtual('reviews', {
  ref: "Review",
  foreignField: "product",
  localField: "_id",
});

const productModel = mongoose.model("Product", productSchema);

export default productModel;
