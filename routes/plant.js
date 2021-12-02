const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const Plant = mongoose.model("Plant");
const Field = mongoose.model("Field");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

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
router.post("/api/plant", [upload.single("picture"), auth], (req, res) => {
  cloudinary.uploader
    .upload(req.file.path)
    .then((result) => {
      const {
        field_id,
        cultivationMethod,
        plantingPhase,
        commodity,
        startDate,
        estimatedResult,
      } = req.body;
      const plant = new Plant({
        field_id,
        user_id: req.user,
        cultivationMethod,
        plantingPhase,
        commodity,
        estimatedResult,
        startDate,
        picture: result.secure_url,
        cloudinary_id: result.public_id,
      });
      plant
        .save()
        .then((plant) => {
          res.status(201).json({ message: "plant berhasil disimpan" });
        })
        .catch((err) => {
          res.status(404).json({ message: err });
        });
    })
    .catch((err) => {
      res.status(401).json({ message: err });
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
router.put("/api/plant/:id", [upload.single("picture"), auth], (req, res) => {
  Plant.findById(req.params.id)
    .then((plant) => {
      cloudinary.uploader.destroy(plant.cloudinary_id);
      //jika ada request file
      if (req.file) {
        cloudinary.uploader
          .upload(req.file.path)
          .then((result) => {
            const data = {
              cultivationMethod:
                req.body.cultivationMethod || plant.cultivationMethod,
              field_id: req.body.field_id || plant.field_id,
              commodity: req.body.commodity || plant.commodity,
              plantingPhase: req.body.plantingPhase || plant.plantingPhase,
              startDate: req.body.startDate || plant.startDate,
              estimatedResult:
                req.body.estimatedResult || plant.estimatedResult,
              picture: result?.secure_url || plant.picture,
              cloudinary_id: result?.public_id || plant.cloudinary_id,
            };

            Plant.findByIdAndUpdate(req.params.id, data, {
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
        Plant.findByIdAndUpdate(req.params.id, req.body, {
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
});

//delete
router.delete("/api/plant/:id", auth, (req, res) => {
  Plant.findByIdAndRemove({ _id: req.params.id }).exec((err, plant) => {
    if (plant) {
      cloudinary.uploader.destroy(plant.cloudinary_id);
      return res.status(200).json({ message: "Berhasil dihapus" });
    }
    res.send(404).json({ error: "plant tidak ditemukan" });
  });
});
module.exports = router;
