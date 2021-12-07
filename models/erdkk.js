const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const erdkkSchema = new mongoose.Schema(
  {
    user_id: {
      type: ObjectId,
      ref: "User",
    },
    villageCode: {
      type: Number,
      required: true,
    },
    gapoktan: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    poktanName: {
      type: String,
      required: true,
    },
    farmerName: {
      type: String,
      required: true,
    },
    idCard: {
      type: String,
      required: true,
    },
    birthPlace: {
      type: String,
      required: true,
    },
    birthDate: {
      type: String,
      required: true,
    },
    motherName: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "New",
    },
    distributorCode: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Erdkk", erdkkSchema);
