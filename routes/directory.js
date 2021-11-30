const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const Directory = mongoose.model("Directory");

// find all
router.get("/api/directory", auth, (req, res) => {
  Directory.find()
    .then((directory) => {
      res.status(200).json({ error: false, message: "success", directory });
    })
    .catch((err) => {
      res.status(404).json({ error: true, message: err });
    });
});
// create
router.post("/api/directory", auth, (req, res) => {
  const { name, address, description, phoneNumber, picture } = req.body;
  if (!name || !address || !picture || !description || !phoneNumber) {
    res.status(404).json({ message: "Semua input harus diisi !" });
  }
  const directory = new Directory({
    name,
    address,
    description,
    phoneNumber,
    picture,
  });

  directory
    .save()
    .then((result) => {
      res.status(201).json({ message: "Directory berhasil disimpan" });
    })
    .catch((err) => {
      res.status(404).json({ message: "terjadi kesalahan" });
    });
});

// find one detail
router.get("/api/directory/:id", auth, (req, res) => {
  Directory.findOne({ _id: req.params.id }).exec((err, directory) => {
    if (err || !directory) {
      res
        .status(404)
        .json({ message: " Directory tidak ditemukan", error: true });
    }
    res.status(200).json({ error: false, message: "success", directory });
  });
});

//update
router.put("/api/directory/:id", auth, (req, res) => {
  const { name, address, description, phoneNumber, picture } = req.body;
  if (!name || !address || !picture || !description || !phoneNumber) {
    res.status(404).json({ message: "Semua input harus diisi !" });
  }
  Directory.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((data) => {
      if (!data) {
        res.status(400).json({ message: "Directory Price tidak ditemukan" });
      }
      res
        .status(200)
        .json({ message: "Directory Price berhasil diupdate", data });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ message: "Directory Price tidak ditemukan", error: err });
    });
});

//delete
router.delete("/api/directory/:id", auth, (req, res) => {
  Directory.findByIdAndRemove({ _id: req.params.id }).exec((err, directory) => {
    if (directory) {
      return res.status(200).json({ message: "Berhasil dihapus" });
    }
    res.send(404).json({ error: err });
  });
});
module.exports = router;
