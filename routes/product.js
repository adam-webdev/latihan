const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const product = mongoose.model("Product");

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
router.post("/api/product", auth, (req, res) => {
  const {
    category,
    price,
    commodity,
    description,
    stock_kg,
    product_picturePath,
  } = req.body;
  if (
    !category ||
    !price ||
    !commodity ||
    !description ||
    !stock_kg ||
    !product_picturePath
  ) {
    res.status(404).json({ message: "semua input harus diisi" });
  }
  const products = new product({
    user_id: req.user,
    category,
    price,
    commodity,
    description,
    stock_kg,
    product_picturePath,
  });

  products
    .save()
    .then((result) => {
      res.status(201).json({ message: "product berhasil disimpan" });
    })
    .catch((err) => {
      res.status(404).json({ message: err });
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
router.put("/api/product/:id", auth, (req, res) => {
  const {
    category,
    price,
    commodity,
    description,
    stock_kg,
    product_picturePath,
  } = req.body;
  if (
    !category ||
    !price ||
    !commodity ||
    !description ||
    !stock_kg ||
    !product_picturePath
  ) {
    res.status(404).json({ message: "semua input harus diisi" });
  }

  product
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((data) => {
      if (!data) {
        res.status(400).json({ message: "Product tidak ditemukan" });
      }
      res.status(200).json({ message: "Product berhasil diupdate", data });
    })
    .catch((err) => {
      res.status(400).json({ message: "Product tidak ditemukan", error: err });
    });
});

//delete
router.delete("/api/product/:id", auth, (req, res) => {
  product.findByIdAndRemove({ _id: req.params.id }).exec((err, product) => {
    if (product) {
      return res.status(200).json({ message: "Berhasil dihapus" });
    }
    res.send(404).json({ error: "Product tidak ditemukan" });
  });
});
module.exports = router;
