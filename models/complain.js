const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const complainSchema = new mongoose.Schema(
  {
    user_id: {
      type: ObjectId,
      ref: "User",
    },
    locationDetail: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    complain_piturePath: {
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

module.exports = mongoose.model("Complain", complainSchema);
