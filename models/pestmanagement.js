const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const pestmanagementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
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

module.exports = mongoose.model("Pestmanagement", pestmanagementSchema);
