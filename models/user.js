const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    address: {
      type: String,
      required: false,
      default: null,
    },
    gapoktan: {
      type: String,
      required: false,
      default: null,
    },
    phoneNumber: {
      type: Number,
      required: false,
      default: null,
    },
    picture: {
      type: String,
      required: false,
      default: null,
    },
    cloudinary_id: {
      type: String,
    },
    role: {
      type: String,
      required: false,
      default: "user",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
