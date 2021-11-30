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
    discussion_piturePath: {
      type: String,
      required: true,
    },
    comments: [
      {
        text: String,
        user_id: {
          type: ObjectId,
          ref: "User",
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Discussion", discussionSchema);
