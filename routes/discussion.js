const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const Discussion = mongoose.model("Discussion");

// find all
router.get("/api/discussion", auth, (req, res) => {
  Discussion.find()
    .then((discussion) => {
      res.status(200).json({ error: false, message: "success", discussion });
    })
    .catch((err) => {
      res.status(404).json({ error: true, message: err });
    });
});
// create
router.post("/api/discussion", auth, (req, res) => {
  const { title, description, discussion_piturePath } = req.body;
  if (!title || !description || !discussion_piturePath) {
    res.status(404).json({ message: "Semua input harus diisi !" });
  }
  const discussion = new Discussion({
    user_id: req.user._id,
    title,
    description,
    discussion_piturePath,
  });

  discussion
    .save()
    .then((result) => {
      res.status(201).json({ message: "discussion berhasil disimpan" });
    })
    .catch((err) => {
      res.status(404).json({ message: err });
    });
});

// find one detail
router.get("/api/discussion/:id", auth, (req, res) => {
  Discussion.findOne({ _id: req.params.id }).exec((err, discussion) => {
    if (err || !discussion) {
      res
        .status(404)
        .json({ message: " discussion tidak ditemukan", error: true });
    }
    res.status(200).json({ error: false, message: "success", discussion });
  });
});

router.put("/api/discussion/comment", auth, (req, res) => {
  const comment = {
    text: req.body.text,
    user_id: req.user._id,
  };
  Discussion.findByIdAndUpdate(
    req.body._id,
    { $push: { comments: comment } },
    { new: true }
  )
    .populate("comment.user_id", "_id name")
    .populate("user_id", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.status(201).json(result);
      }
    });
});

//update
router.put("/api/discussion/:id", auth, (req, res) => {
  const { title, description, discussion_piturePath } = req.body;
  if (!title || !description || !discussion_piturePath) {
    res.status(404).json({ message: "Semua input harus diisi !" });
  }
  Discussion.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((data) => {
      if (!data) {
        res.status(400).json({ message: "discussion  tidak ditemukan" });
      }
      res.status(200).json({ message: "discussion  berhasil diupdate", data });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ message: "discussion  tidak ditemukan", error: err });
    });
});

//delete
router.delete("/api/discussion/:id", auth, (req, res) => {
  Discussion.findOne({ _id: req.params.id })
    .populate("user_id", "_id")
    .exec((err, discussion) => {
      if (err || !discussion) {
        return res.status(422).json({ message: "Tidak ditemukan" });
      }
      if (discussion.user_id._id.toString() === req.user._id.toString()) {
        discussion
          .remove()
          .then((result) => {
            res.json(result);
          })
          .catch((err) => {
            res.json({ message: err });
          });
      }
      res.send(404).json({ error: err });
    });
});
module.exports = router;
