const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const Plantingguide = mongoose.model("Plantingguide");

// find all
router.get("/api/plantingguide", auth, (req, res) => {
  Plantingguide.find()
    .then((plantingguide) => {
      res.status(200).json({ error: false, message: "success", plantingguide });
    })
    .catch((err) => {
      res.status(404).json({ error: true, message: err });
    });
});
// create
router.post("/api/plantingguide", auth, (req, res) => {
  const { title, description, picture } = req.body;
  if (!title || !description || !picture) {
    res.status(404).json({ message: "semua input harus diisi" });
  }
  const plantingguide = new Plantingguide({
    title,
    description,
    picture,
  });

  plantingguide
    .save()
    .then((result) => {
      res.status(201).json({ message: "plantingguide berhasil disimpan" });
    })
    .catch((err) => {
      res.status(404).json({ message: err });
    });
});

// find one detail
router.get("/api/plantingguide/:id", auth, (req, res) => {
  Plantingguide.findOne({ _id: req.params.id }).exec((err, plantingguide) => {
    if (err || !plantingguide) {
      res
        .status(404)
        .json({ message: "plantingguide  tidak ditemukan", error: true });
    }
    res.status(200).json({ error: false, message: "success", plantingguide });
  });
});

//update
router.put("/api/plantingguide/:id", auth, (req, res) => {
  const { title, description, picture } = req.body;
  if (!title || !description || !picture) {
    res.status(404).json({ message: "semua input harus diisi" });
  }
  Plantingguide.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((data) => {
      if (!data) {
        res.status(400).json({ message: "plantingguide tidak ditemukan" });
      }
      res
        .status(200)
        .json({ message: "plantingguide berhasil diupdate", data });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ message: "plantingguide tidak ditemukan", error: err });
    });
});

//delete
router.delete("/api/plantingguide/:id", auth, (req, res) => {
  Plantingguide.findByIdAndRemove({ _id: req.params.id }).exec(
    (err, plantingguide) => {
      if (plantingguide) {
        return res.status(200).json({ message: "Berhasil dihapus" });
      }
      res.send(404).json({ error: "plantingguide tidak ditemukan" });
    }
  );
});
module.exports = router;
