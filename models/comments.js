const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    user_id: {
      type: ObjectId,
      ref: "User",
    },
    discussion_id: {
      type: ObjectId,
      ref: "Discussion",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
