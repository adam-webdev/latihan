const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const Complain = mongoose.model("Complain");

// find all
router.get("/api/complain", auth, (req, res) => {
  Complain.find()
    .then((complain) => {
      res.status(200).json({ error: false, message: "success", complain });
    })
    .catch((err) => {
      res.status(404).json({ error: true, message: err });
    });
});
// create
router.post("/api/complain", auth, (req, res) => {
  const { locationDetail, description, complain_piturePath, status } = req.body;
  if (!locationDetail || !description || !status || !complain_piturePath) {
    res.status(404).json({ message: "semua input harus diisi" });
  }
  const complains = new Complain({
    user_id: req.user,
    locationDetail,
    description,
    status,
    complain_picturePath,
  });

  complains
    .save()
    .then((result) => {
      res.status(201).json({ message: "complain berhasil disimpan" });
    })
    .catch((err) => {
      res.status(404).json({ message: err });
    });
});

// find one detail
router.get("/api/complain/:id", auth, (req, res) => {
  complain.findOne({ _id: req.params.id }).exec((err, complain) => {
    if (err || !complain) {
      res.status(404).json({ message: err, error: true });
    }
    res.status(200).json({ error: false, message: "success", complain });
  });
});

//update
router.put("/api/complain/:id", auth, (req, res) => {
  Complain.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((data) => {
      if (!data) {
        res.status(400).json({ message: "complain tidak ditemukan" });
      }
      res.status(200).json({ message: "complain berhasil diupdate", data });
    })
    .catch((err) => {
      res.status(400).json({ message: "complain tidak ditemukan", error: err });
    });
});

//delete
router.delete("/api/complain/:id", auth, (req, res) => {
  Complain.findByIdAndRemove({ _id: req.params.id }).exec((err, complain) => {
    if (complain) {
      return res.status(200).json({ message: "Berhasil dihapus" });
    }
    res.send(404).json({ error: "complain tidak ditemukan" });
  });
});
module.exports = router;
