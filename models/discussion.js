const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const discussionSchema = new mongoose.Schema(
  {
    user_id: {
      type: ObjectId,
      ref: "User",
    },
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
    // comments: [
    //   {
    //     time: {
    //       type: Date,
    //       default: Date.now(),
    //     },
    //     text: String,
    //     user_id: {
    //       type: ObjectId,
    //       ref: "User",
    //     },
    //   },
    // ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Discussion", discussionSchema);
