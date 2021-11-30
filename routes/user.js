const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const User = mongoose.model("User");

router.get("/api/user", auth, (req, res) => {
  User.find()
    // .select("+password")
    .then((user) => {
      res.status(200).json({ error: false, message: "success", data: user });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/api/user/:id", auth, (req, res) => {
  User.findOne({ _id: req.params.id }).exec((err, user) => {
    if (err || !user) {
      res.status(404).json({ message: "User tidak ditemukan", error: true });
    }
    res.status(200).json({ error: false, message: "success", user });
  });
});

router.put("/api/user/:id", auth, (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    (err, data) => {
      if (err) {
        return res
          .status(401)
          .json({ message: "terjadi kesalahan harap isi semua inputan" });
      }
      return res.status(201).json({ message: "Berhasil update.", data });
    }
  );
});
router.delete("/api/user/:id", auth, (req, res) => {
  User.findByIdAndRemove({ _id: req.params.id }).exec((err, user) => {
    if (user) {
      return res.status(200).json({ message: "Berhasil dihapus" });
    }
    res.send(404).json({ error: "User tidak ditemukan" });
  });
});
module.exports = router;
