const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const plantingguideSchema = new mongoose.Schema(
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Plantingguide", plantingguideSchema);
