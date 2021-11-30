const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const plantSchema = new mongoose.Schema(
  {
    user_id: {
      type: ObjectId,
      ref: "User",
    },
    field_id: {
      type: ObjectId,
      ref: "Field",
    },
    cultivationMethod: {
      type: String,
      required: true,
    },
    commodity: {
      type: String,
      required: true,
    },
    plantingPhase: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    estimatedResult: {
      type: String,
      required: true,
    },
    plant_picturePath: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Plant", plantSchema);
