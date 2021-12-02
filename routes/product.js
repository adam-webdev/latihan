const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const product = mongoose.model("Product");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
// find all
router.get("/api/product", auth, (req, res) => {
  product
    .find()
    .then((product) => {
      res.status(200).json({ error: false, message: "success", product });
    })
    .catch((err) => {
      res.status(404).json({ error: true, message: err });
    });
});
// create
router.post("/api/product", [upload.single("picture"), auth], (req, res) => {
  cloudinary.uploader
    .upload(req.file.path)
    .then((result) => {
      const { price, description, category, commodity, stock_kg } = req.body;
      const product = new Product({
        price,
        user_id: req.user,
        description,
        category,
        commodity,
        stock_kg,
        picture: result.secure_url,
        cloudinary_id: result.public_id,
      });
      product
        .save()
        .then((product) => {
          res.status(201).json({ message: "product berhasil disimpan" });
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
router.get("/api/product/:id", auth, (req, res) => {
  product.findOne({ _id: req.params.id }).exec((err, product) => {
    if (err || !product) {
      res.status(404).json({ message: err, error: true });
    }
    res.status(200).json({ error: false, message: "success", product });
  });
});

//update
router.put("/api/product/:id", [upload.single("picture"), auth], (req, res) => {
  Product.findById(req.params.id)
    .then((product) => {
      res.json(product);

      cloudinary.uploader.destroy(product.cloudinary_id);
      //jika ada request file
      if (req.file) {
        cloudinary.uploader
          .upload(req.file.path)
          .then((result) => {
            const data = {
              category: req.body.name || product.name,
              price: req.body.email || product.email,
              commodity: req.body.address || product.address,
              description: req.body.role || product.role,
              stock_kg: req.body.gapoktan || product.gapoktan,
              picture: result?.secure_url || product.picture,
              cloudinary_id: result?.public_id || product.cloudinary_id,
            };

            Product.findByIdAndUpdate(req.params.id, data, { new: true })
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
        Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
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
router.delete("/api/product/:id", auth, (req, res) => {
  product.findByIdAndRemove({ _id: req.params.id }).exec((err, product) => {
    if (product) {
      cloudinary.uploader.destroy(product.cloudinary_id);
      return res.status(200).json({ message: "Berhasil dihapus" });
    }
    res.send(404).json({ error: "Product tidak ditemukan" });
  });
});
module.exports = router;
