const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const producerpriceSchema = new mongoose.Schema(
  {
    comodityName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    picture: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Producerprice", producerpriceSchema);
