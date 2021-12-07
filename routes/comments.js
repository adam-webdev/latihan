const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const Comment = mongoose.model("Comment");

// find all
router.get("/api/comment", auth, (req, res) => {
  Comment.find()
    .then((comment) => {
      res.status(200).json({ error: false, message: "success", comment });
    })
    .catch((err) => {
      res.status(404).json({ error: true, message: err });
    });
});
// create
router.post("/api/comment/:id", auth, (req, res) => {
  const { text } = req.body;
  const comment = new Comment({
    text,
    user_id: req.user._id,
    discussion_id: req.params.id,
  });
  comment
    .save()
    .then((comment) => {
      res.status(201).json({ message: "comments berhasil disimpan" });
    })
    .catch((err) => {
      res.status(404).json({ message: err });
    });
});

// find one detail
router.get("/api/comment/:id", auth, (req, res) => {
  Comment.find({ discussion_id: req.params.id })
    .populate("discussion_id", "title")
    .populate("user_id", "_id name")
    .exec((err, comment) => {
      if (err || !comment) {
        res
          .status(404)
          .json({ message: " comment tidak ditemukan", error: true });
      }
      res.status(200).json({ error: false, message: "success", comment });
    });
});

//update
router.put("/api/comment/:id", auth, (req, res) => {
  Comment.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((result) => {
      res.json({ message: "Berhasil update", result });
    })
    .catch((err) => {
      res.json({ message: err });
    });
  //jika ada request file
});

//delete
router.delete("/api/comment/:commenId", auth, (req, res) => {
  Comment.findByIdAndRemove({ _id: req.params.commenId }).exec(
    (err, comment) => {
      if (comment) {
        return res.status(200).json({ message: "Berhasil dihapus" });
      }
      res.send(404).json({ error: err });
    }
  );
});
module.exports = router;
