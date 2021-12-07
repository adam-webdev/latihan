const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const Erdkk = mongoose.model("Erdkk");

// find all
router.get("/api/erdkk", auth, (req, res) => {
  Erdkk.find()
    .populate("user_id", "name email")
    .then((erdkk) => {
      res.status(200).json({ error: false, message: "success", erdkk });
    })
    .catch((err) => {
      res.status(404).json({ error: true, message: err });
    });
});
// create
router.post("/api/erdkk", auth, (req, res) => {
  const {
    villageCode,
    gapoktan,
    address,
    poktanName,
    farmerName,
    idCard,
    birthPlace,
    birthDate,
    motherName,
    distributorCode,
  } = req.body;
  if (
    !villageCode ||
    !gapoktan ||
    !address ||
    !poktanName ||
    !farmerName ||
    !idCard ||
    !birthPlace ||
    !motherName ||
    !birthDate ||
    !distributorCode
  ) {
    res.status(404).json({ message: "semua input harus diisi" });
  }
  const erdkks = new Erdkk({
    user_id: req.user._id,
    villageCode,
    gapoktan,
    address,
    poktanName,
    farmerName,
    idCard,
    birthPlace,
    birthDate,
    motherName,
    distributorCode,
  });

  erdkks
    .save()
    .then((result) => {
      res.status(201).json({ message: "erdkk berhasil disimpan" });
    })
    .catch((err) => {
      res.status(404).json({ message: err });
    });
});

// find one detail
router.get("/api/erdkk/:id", auth, (req, res) => {
  Erdkk.findOne({ _id: req.params.id })
    .populate("user_id", "name email")
    .exec((err, erdkk) => {
      if (err || !erdkk) {
        res.status(404).json({ message: err, error: true });
      }
      res.status(200).json({ error: false, message: "success", erdkk });
    });
});

//update
router.put("/api/erdkk/:id", auth, (req, res) => {
  Erdkk.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((data) => {
      if (!data) {
        res.status(400).json({ message: "erdkk tidak ditemukan" });
      }
      res.status(200).json({ message: "erdkk berhasil diupdate", data });
    })
    .catch((err) => {
      res.status(400).json({ message: "erdkk tidak ditemukan", error: err });
    });
});

//delete
router.delete("/api/erdkk/:id", auth, (req, res) => {
  Erdkk.findByIdAndRemove({ _id: req.params.id }).exec((err, erdkk) => {
    if (erdkk) {
      return res.status(200).json({ message: "Berhasil dihapus" });
    }
    res.send(404).json({ error: "erdkk tidak ditemukan" });
  });
});
module.exports = router;
