const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const Plant = mongoose.model("Plant");

// find all
router.get("/api/plant", auth, (req, res) => {
  Plant.find()
    .then((plant) => {
      res.status(200).json({ error: false, message: "success", plant });
    })
    .catch((err) => {
      res.status(404).json({ error: true, message: err });
    });
});
// create
router.post("/api/plant", auth, (req, res) => {
  const {
    field_id,
    cultivationMethod,
    commodity,
    plantingPhase,
    startDate,
    estimatedResult,
    plant_picturePath,
  } = req.body;
  if (
    !cultivationMethod ||
    !commodity ||
    !plantingPhase ||
    !startDate ||
    !estimatedResult ||
    !plant_picturePath ||
    !field_id
  ) {
    res.status(404).json({ message: "semua input harus diisi" });
  }
  const plants = new Plant({
    user_id: req.user,
    field_id,
    locationDetail,
    description,
    status,
    plant_picturePath,
  });

  plants
    .save()
    .then((result) => {
      res.status(201).json({ message: "plant berhasil disimpan" });
    })
    .catch((err) => {
      res.status(404).json({ message: err });
    });
});

// find one detail
router.get("/api/plant/:id", auth, (req, res) => {
  Plant.findOne({ _id: req.params.id }).exec((err, plant) => {
    if (err || !plant) {
      res.status(404).json({ message: err, error: true });
    }
    res.status(200).json({ error: false, message: "success", plant });
  });
});

//update
router.put("/api/plant/:id", auth, (req, res) => {
  Plant.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((data) => {
      if (!data) {
        res.status(400).json({ message: "plant tidak ditemukan" });
      }
      res.status(200).json({ message: "plant berhasil diupdate", data });
    })
    .catch((err) => {
      res.status(400).json({ message: "plant tidak ditemukan", error: err });
    });
});

//delete
router.delete("/api/plant/:id", auth, (req, res) => {
  Plant.findByIdAndRemove({ _id: req.params.id }).exec((err, plant) => {
    if (plant) {
      return res.status(200).json({ message: "Berhasil dihapus" });
    }
    res.send(404).json({ error: "plant tidak ditemukan" });
  });
});
module.exports = router;
