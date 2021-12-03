const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const Pestmanagement = mongoose.model("Pestmanagement");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
// find all
router.get("/api/pestmanagement", auth, (req, res) => {
  Pestmanagement.find()
    .then((pestmanagement) => {
      res
        .status(200)
        .json({ error: false, message: "success", pestmanagement });
    })
    .catch((err) => {
      res.status(404).json({ error: true, message: err });
    });
});
// create
router.post(
  "/api/pestmanagement",
  [upload.single("picture"), auth],
  (req, res) => {
    cloudinary.uploader
      .upload(req.file.path)
      .then((result) => {
        const { title, description } = req.body;
        const pestmanagement = new Pestmanagement({
          title,
          description,
          picture: result.secure_url,
          cloudinary_id: result.public_id,
        });
        pestmanagement
          .save()
          .then((pestmanagement) => {
            res
              .status(201)
              .json({ message: "pestmanagement berhasil disimpan" });
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
router.get("/api/pestmanagement/:id", auth, (req, res) => {
  Pestmanagement.findOne({ _id: req.params.id }).exec((err, pestmanagement) => {
    if (err || !pestmanagement) {
      res
        .status(404)
        .json({ message: "Pestmanagement  tidak ditemukan", error: true });
    }
    res.status(200).json({ error: false, message: "success", pestmanagement });
  });
});

//update
router.put(
  "/api/pestmanagement/:id",
  [upload.single("picture"), auth],
  (req, res) => {
    Pestmanagement.findById(req.params.id)
      .then((pestmanagement) => {
        cloudinary.uploader.destroy(pestmanagement.cloudinary_id);
        //jika ada request file
        if (req.file) {
          cloudinary.uploader
            .upload(req.file.path)
            .then((result) => {
              const data = {
                title: req.body.title || pestmanagement.title,
                description: req.body.description || pestmanagement.description,
                picture: result?.secure_url || pestmanagement.picture,
                cloudinary_id:
                  result?.public_id || pestmanagement.cloudinary_id,
              };

              Pestmanagement.findByIdAndUpdate(req.params.id, data, {
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
          Pestmanagement.findByIdAndUpdate(req.params.id, req.body, {
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
  }
);

//delete
router.delete("/api/pestmanagement/:id", auth, (req, res) => {
  Pestmanagement.findByIdAndRemove({ _id: req.params.id }).exec(
    (err, pestmanagement) => {
      if (pestmanagement) {
        cloudinary.uploader.destroy(pestmanagement.cloudinary_id);
        return res.status(200).json({ message: "Berhasil dihapus" });
      }
      res.send(404).json({ error: "Pestmanagement tidak ditemukan" });
    }
  );
});
module.exports = router;
