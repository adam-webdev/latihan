const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const Plantingguide = mongoose.model("Plantingguide");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
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
router.post(
  "/api/plantingguide",
  [upload.single("picture"), auth],
  (req, res) => {
    cloudinary.uploader
      .upload(req.file.path)
      .then((result) => {
        const { title, description } = req.body;
        const plantingguide = new Plantingguide({
          title,
          description,
          picture: result.secure_url,
          cloudinary_id: result.public_id,
        });
        plantingguide
          .save()
          .then((plantingguide) => {
            res
              .status(201)
              .json({ message: "plantingguide berhasil disimpan" });
          })
          .catch((err) => {
            res.status(404).json({ message: err });
          });
      })
      .catch((err) => {
        res.status(401).json({ message: err });
      });
  }
);

// find one detail
router.get(
  "/api/plantingguide/:id",
  [upload.single("picture"), auth],
  (req, res) => {
    Plantingguide.findOne({ _id: req.params.id }).exec((err, plantingguide) => {
      if (err || !plantingguide) {
        res
          .status(404)
          .json({ message: "plantingguide  tidak ditemukan", error: true });
      }
      res.status(200).json({ error: false, message: "success", plantingguide });
    });
  }
);

//update
router.put("/api/plantingguide/:id", auth, (req, res) => {
  Plantingguide.findById(req.params.id)
    .then((plantingguide) => {
      cloudinary.uploader.destroy(plantingguide.cloudinary_id);
      //jika ada request file
      if (req.file) {
        cloudinary.uploader
          .upload(req.file.path)
          .then((result) => {
            const data = {
              title: req.body.title || plantingguide.title,
              description: req.body.description || plantingguide.description,
              picture: result?.secure_url || plantingguide.picture,
              cloudinary_id: result?.public_id || plantingguide.cloudinary_id,
            };

            Plantingguide.findByIdAndUpdate(req.params.id, data, {
              new: true,
            })
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
        Plantingguide.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
        })
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

//delete
router.delete("/api/plantingguide/:id", auth, (req, res) => {
  Plantingguide.findByIdAndRemove({ _id: req.params.id }).exec(
    (err, plantingguide) => {
      if (plantingguide) {
        cloudinary.uploader.destroy(plantingguide.cloudinary_id);
        return res.status(200).json({ message: "Berhasil dihapus" });
      }
      res.send(404).json({ error: "plantingguide tidak ditemukan" });
    }
  );
});
module.exports = router;
