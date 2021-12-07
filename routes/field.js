const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const Field = mongoose.model("Field");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
// find all
router.get("/api/field", auth, (req, res) => {
  Field.find()
    .populate("user_id", "name")
    .then((field) => {
      res.status(200).json({ error: false, message: "success", field });
    })
    .catch((err) => {
      res.status(404).json({ error: true, message: err });
    });
});
// create
router.post("/api/field", auth, (req, res) => {
  const { name, large, address, hamlet, village, district, status } = req.body;
  if (
    !name ||
    !large ||
    !address ||
    !hamlet ||
    !village ||
    !district ||
    !status
  ) {
    res.status(404).json({ message: "semua input harus diisi" });
  }
  const fields = new Field({
    user_id: req.user,
    name,
    large,
    address,
    hamlet,
    village,
    district,
    status,
  });

  fields
    .save()
    .then((result) => {
      res.status(201).json({ message: "field berhasil disimpan" });
    })
    .catch((err) => {
      res.status(404).json({ message: err });
    });
});

// find one detail
router.get("/api/field/:id", auth, (req, res) => {
  Field.findOne({ _id: req.params.id }).exec((err, field) => {
    if (err || !field) {
      res.status(404).json({ message: err, error: true });
    }
    res.status(200).json({ error: false, message: "success", field });
  });
});

//update
router.put("/api/field/:id", auth, (req, res) => {
  Field.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((data) => {
      if (!data) {
        res.status(400).json({ message: "field tidak ditemukan" });
      }
      res.status(200).json({ message: "field berhasil diupdate", data });
    })
    .catch((err) => {
      res.status(400).json({ message: "field tidak ditemukan", error: err });
    });
});

//delete
router.delete("/api/field/:id", auth, (req, res) => {
  Field.findByIdAndRemove({ _id: req.params.id }).exec((err, field) => {
    if (field) {
      return res.status(200).json({ message: "Berhasil dihapus" });
    }
    res.send(404).json({ error: "field tidak ditemukan" });
  });
});
module.exports = router;
