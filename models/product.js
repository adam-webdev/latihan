const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const productSchema = new mongoose.Schema(
  {
    user_id: {
      type: ObjectId,
      ref: "User",
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    commodity: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    stock_kg: {
      type: Number,
      required: true,
    },
    picture: {
      type: String,
      required: true,
    },
    cloudinary_id: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
