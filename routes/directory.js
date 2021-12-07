const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const Directory = mongoose.model("Directory");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
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
router.post("/api/directory", [upload.single("picture"), auth], (req, res) => {
  cloudinary.uploader
    .upload(req.file.path)
    .then((result) => {
      const { name, address, description, phoneNumber } = req.body;
      const directory = new Directory({
        name,
        address,
        description,
        phoneNumber,
        picture: result.secure_url,
        cloudinary_id: result.public_id,
      });
      directory
        .save()
        .then((directory) => {
          res.status(201).json({ message: "directory berhasil disimpan" });
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
router.put(
  "/api/directory/:id",
  [upload.single("picture"), auth],
  (req, res) => {
    Directory.findById(req.params.id)
      .then((directory) => {
        //jika ada request file
        if (req.file) {
          cloudinary.uploader.destroy(directory.cloudinary_id);
          cloudinary.uploader
            .upload(req.file.path)
            .then((result) => {
              const data = {
                name: req.body.name || directory.name,
                address: req.body.address || directory.address,
                phoneNumber: req.body.phoneNumber || directory.phoneNumber,
                description: req.body.description || directory.description,
                picture: result?.secure_url,
                cloudinary_id: result?.public_id,
              };

              Directory.findByIdAndUpdate(req.params.id, data, {
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
          const oldData = {
            name: req.body.name || directory.name,
            address: req.body.address || directory.address,
            phoneNumber: req.body.phoneNumber || directory.phoneNumber,
            description: req.body.description || directory.description,
            picture: directory.picture,
            cloudinary_id: directory.cloudinary_id,
          };
          Directory.findByIdAndUpdate(req.params.id, oldData, {
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
router.delete("/api/directory/:id", auth, (req, res) => {
  Directory.findByIdAndRemove({ _id: req.params.id }).exec((err, directory) => {
    if (directory) {
      cloudinary.uploader.destroy(directory.cloudinary_id);
      return res.status(200).json({ message: "Berhasil dihapus" });
    }
    res.send(404).json({ error: err });
  });
});
module.exports = router;
