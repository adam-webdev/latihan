const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const fieldSchema = new mongoose.Schema(
  {
    user_id: {
      type: ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    large: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    hamlet: {
      type: String,
      required: true,
    },
    village: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Field", fieldSchema);
