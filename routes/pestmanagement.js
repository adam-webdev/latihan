const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const Pestmanagement = mongoose.model("Pestmanagement");

// find all
router.get("/api/pestmanagement", auth, (req, res) => {
  Pestmanagement.find()
    .then((pestmanagement) => {
      res
        .status(200)
        .json({ error: false, message: "success", pestmanagement });
    })
    .catch((err) => {
      res.status(404).json({ error: true, message: err });
    });
});
// create
router.post("/api/pestmanagement", auth, (req, res) => {
  const { title, description, picture } = req.body;
  if (!title || !description || !picture) {
    res.status(404).json({ message: "semua input harus diisi" });
  }
  const pestmanagement = new Pestmanagement({
    title,
    description,
    picture,
  });

  pestmanagement
    .save()
    .then((result) => {
      res.status(201).json({ message: "Pestmanagement berhasil disimpan" });
    })
    .catch((err) => {
      res.status(404).json({ message: err });
    });
});

// find one detail
router.get("/api/pestmanagement/:id", auth, (req, res) => {
  Pestmanagement.findOne({ _id: req.params.id }).exec((err, pestmanagement) => {
    if (err || !pestmanagement) {
      res
        .status(404)
        .json({ message: "Pestmanagement  tidak ditemukan", error: true });
    }
    res.status(200).json({ error: false, message: "success", pestmanagement });
  });
});

//update
router.put("/api/pestmanagement/:id", auth, (req, res) => {
  const { title, description, picture } = req.body;
  if (!title || !description || !picture) {
    res.status(404).json({ message: "semua input harus diisi" });
  }
  Pestmanagement.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((data) => {
      if (!data) {
        res.status(400).json({ message: "Pestmanagement tidak ditemukan" });
      }
      res
        .status(200)
        .json({ message: "Pestmanagement berhasil diupdate", data });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ message: "Pestmanagement tidak ditemukan", error: err });
    });
});

//delete
router.delete("/api/pestmanagement/:id", auth, (req, res) => {
  Pestmanagement.findByIdAndRemove({ _id: req.params.id }).exec(
    (err, pestmanagement) => {
      if (pestmanagement) {
        return res.status(200).json({ message: "Berhasil dihapus" });
      }
      res.send(404).json({ error: "Pestmanagement tidak ditemukan" });
    }
  );
});
module.exports = router;
