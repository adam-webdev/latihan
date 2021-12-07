const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const Producerprice = mongoose.model("Producerprice");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
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
router.post(
  "/api/producerprice",
  [upload.single("picture"), auth],
  (req, res) => {
    cloudinary.uploader
      .upload(req.file.path)
      .then((result) => {
        const { price, comodityName } = req.body;
        const producerprice = new Producerprice({
          price,
          comodityName,
          picture: result.secure_url,
          cloudinary_id: result.public_id,
        });
        producerprice
          .save()
          .then((producerprice) => {
            res
              .status(201)
              .json({ message: "Producerprice berhasil disimpan" });
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
router.put(
  "/api/producerprice/:id",
  [upload.single("picture"), auth],
  (req, res) => {
    Producerprice.findById(req.params.id)
      .then((producerprice) => {
        //jika ada request file
        if (req.file) {
          cloudinary.uploader.destroy(producerprice.cloudinary_id);
          cloudinary.uploader
            .upload(req.file.path)
            .then((result) => {
              const data = {
                price: req.body.price || producerprice.price,
                comodityName:
                  req.body.comodityName || producerprice.comodityName,
                picture: result?.secure_url,
                cloudinary_id: result?.public_id,
              };

              Producerprice.findByIdAndUpdate(req.params.id, data, {
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
            price: req.body.price || producerprice.price,
            comodityName: req.body.comodityName || producerprice.comodityName,
            picture: producerprice.picture,
            cloudinary_id: producerprice.cloudinary_id,
          };
          Producerprice.findByIdAndUpdate(req.params.id, oldData, {
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
router.delete("/api/producerprice/:id", auth, (req, res) => {
  Producerprice.findByIdAndRemove({ _id: req.params.id }).exec(
    (err, producerprice) => {
      if (producerprice) {
        cloudinary.uploader.destroy(producerprice.cloudinary_id);

        return res.status(200).json({ message: "Berhasil dihapus" });
      }
      res.send(404).json({ error: "Producer Price tidak ditemukan" });
    }
  );
});
module.exports = router;
