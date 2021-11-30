const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const Producerprice = mongoose.model("Producerprice");

// find all
router.get("/api/producerprice", auth, (req, res) => {
  Producerprice.find()
    .then((producerprice) => {
      res.status(200).json({ error: false, message: "success", producerprice });
    })
    .catch((err) => {
      res.status(404).json({ error: true, message: err });
    });
});
// create
router.post("/api/producerprice", auth, (req, res) => {
  const { comodityName, price, picture } = req.body;
  if (!comodityName || !price || !picture) {
    res.status(404).json({ message: "semua input harus diisi" });
  }
  const producerprice = new Producerprice({
    comodityName,
    price,
    picture,
  });

  producerprice
    .save()
    .then((result) => {
      res.status(201).json({ message: "producerprice berhasil disimpan" });
    })
    .catch((err) => {
      res.status(404).json({ message: err });
    });
});

// find one detail
router.get("/api/producerprice/:id", auth, (req, res) => {
  Producerprice.findOne({ _id: req.params.id }).exec((err, producerprice) => {
    if (err || !producerprice) {
      res
        .status(404)
        .json({ message: "Producer Price tidak ditemukan", error: true });
    }
    res.status(200).json({ error: false, message: "success", producerprice });
  });
});

//update
router.put("/api/producerprice/:id", auth, (req, res) => {
  const { comodityName, price, picture } = req.body;
  if (!comodityName || !price || !picture) {
    res.status(404).json({ message: "semua input harus diisi" });
  }
  Producerprice.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((data) => {
      if (!data) {
        res.status(400).json({ message: "Producer Price tidak ditemukan" });
      }
      res
        .status(200)
        .json({ message: "Producer Price berhasil diupdate", data });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ message: "Producer Price tidak ditemukan", error: err });
    });
});

//delete
router.delete("/api/producerprice/:id", auth, (req, res) => {
  Producerprice.findByIdAndRemove({ _id: req.params.id }).exec(
    (err, producerprice) => {
      if (producerprice) {
        return res.status(200).json({ message: "Berhasil dihapus" });
      }
      res.send(404).json({ error: "Producer Price tidak ditemukan" });
    }
  );
});
module.exports = router;
