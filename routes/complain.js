const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const Complain = mongoose.model("Complain");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
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
router.post("/api/complain", [upload.single("picture"), auth], (req, res) => {
  cloudinary.uploader
    .upload(req.file.path)
    .then((result) => {
      const { locationDetail, description, status } = req.body;
      const complain = new Complain({
        locationDetail,
        status,
        description,
        picture: result.secure_url,
        cloudinary_id: result.public_id,
      });
      complain
        .save()
        .then((complain) => {
          res.status(201).json({ message: "complain berhasil disimpan" });
        })
        .catch((err) => {
          res.status(404).json({ message: err });
        });
    })
    .catch((err) => {
      res.status(404).json({ message: err });
    });
});

// find one detail
router.get("/api/complain/:id", auth, (req, res) => {
  Complain.findOne({ _id: req.params.id }).exec((err, complain) => {
    if (err || !complain) {
      res.status(404).json({ message: "Tidak ditemukan", error: true });
    }
    res.status(200).json({ error: false, message: "success", complain });
  });
});

//update
router.put(
  "/api/complain/:id",
  [upload.single("picture"), auth],
  (req, res) => {
    Complain.findById(req.params.id)
      .then((complain) => {
        cloudinary.uploader.destroy(complain.cloudinary_id);
        //jika ada request file
        if (req.file) {
          cloudinary.uploader
            .upload(req.file.path)
            .then((result) => {
              const data = {
                locationDetail:
                  req.body.locationDetail || complain.locationDetail,
                status: req.body.status || complain.status,
                description: req.body.description || complain.description,
                picture: result?.secure_url || complain.picture,
                cloudinary_id: result?.public_id || complain.cloudinary_id,
              };

              Complain.findByIdAndUpdate(req.params.id, data, {
                new: true,
              })
                .then((res) => {
                  res.json({ message: "Berhasil update", res });
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
          Complain.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
          })
            .then((res) => {
              res.json({ message: "Berhasil update", res });
            })
            .catch((err) => {
              res.json({ message: err });
            });
        }
      })
      .catch((err) => {
        res.json({ message: err });
      });
  }
);

//delete
router.delete("/api/complain/:id", auth, (req, res) => {
  Complain.findByIdAndRemove({ _id: req.params.id }).exec((err, complain) => {
    if (complain) {
      cloudinary.uploader.destroy(complain.cloudinary_id);
      return res.status(200).json({ message: "Berhasil dihapus" });
    }
    res.send(404).json({ error: "complain tidak ditemukan" });
  });
});
module.exports = router;
