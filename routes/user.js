const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const User = mongoose.model("User");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

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

router.put("/api/user/:id", [upload.single("picture"), auth], (req, res) => {
  User.findById(req.params.id)
    .then((users) => {
      cloudinary.uploader.destroy(users.cloudinary_id);
      //jika ada request file
      if (req.file) {
        cloudinary.uploader
          .upload(req.file.path)
          .then((result) => {
            const data = {
              name: req.body.name || users.name,
              email: req.body.email || users.email,
              address: req.body.address || users.address,
              role: req.body.role || users.role,
              gapoktan: req.body.gapoktan || users.gapoktan,
              phoneNumber: req.body.phoneNumber || users.phoneNumber,
              picture: result?.secure_url || users.picture,
              cloudinary_id: result?.public_id || users.cloudinary_id,
            };

            User.findByIdAndUpdate(req.params.id, data, { new: true })
              .then((result) => {
                res.json({ message: "Berhasil update", result });
              })
              .catch((err) => {
                res.json({ message: err });
              });
          })
          .catch((err) => {
            res.json({ message: err });
          });
        // jika tidak ada request file
      } else {
        User.findByIdAndUpdate(req.params.id, req.body, { new: true })
          .then((result) => {
            res.json({ message: "Berhasil update", result });
          })
          .catch((err) => {
            res.json({ message: err });
          });
      }
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

router.delete("/api/user/:id", auth, (req, res) => {
  User.findByIdAndRemove({ _id: req.params.id }).exec((err, user) => {
    if (user) {
      cloudinary.uploader.destroy(user.cloudinary_id);
      return res.status(200).json({ message: "Berhasil dihapus" });
    }
    res.send(404).json({ error: "User tidak ditemukan" });
  });
});
module.exports = router;
