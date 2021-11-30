const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const News = mongoose.model("News");

// find all
router.get("/api/news", auth, (req, res) => {
  News.find()
    .then((news) => {
      res.status(200).json({ error: false, message: "success", news });
    })
    .catch((err) => {
      res.status(404).json({ error: true, message: err });
    });
});
// create
router.post("/api/news", auth, (req, res) => {
  const { title, contents, writter, picture } = req.body;
  const news = new News({
    title,
    contents,
    writter,
    picture,
  });
  news
    .save()
    .then((result) => {
      res.status(201).json({ message: "News berhasil disimpan" });
    })
    .catch((err) => {
      res.status(404).json({ message: err });
    });
});

// find one detail
router.get("/api/news/:id", auth, (req, res) => {
  News.findOne({ _id: req.params.id }).exec((err, news) => {
    if (err || !news) {
      res.status(404).json({ message: "News tidak ditemukan", error: true });
    }
    res.status(200).json({ error: false, message: "success", news });
  });
});

//update
router.put("/api/news/:id", auth, (req, res) => {
  const { title, contents, writter, picture } = req.body;
  if (!title || !contents || !writter || !picture) {
    res.status(404).json({ message: "Semua input harus di isi" });
  }

  News.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((news) => {
      if (!news) {
        res.status(404).json({ message: "News tidak ditemukan", error: true });
      }
      res
        .status(201)
        .json({ message: "News berhasil diupdate", error: false, news });
    })
    .catch((err) => {
      res.status(400).json({ message: "News tidak ditemukan", error: true });
    });
});

//delete
router.delete("/api/news/:id", auth, (req, res) => {
  News.findByIdAndRemove({ _id: req.params.id }).exec((err, news) => {
    if (news) {
      return res.status(200).json({ message: "Berhasil dihapus" });
    }
    res.send(404).json({ error: "News tidak ditemukan" });
  });
});
module.exports = router;
