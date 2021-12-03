const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const News = mongoose.model("News");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

// find all
router.get("/api/news", auth, (req, res) => {
  News.find()
    .then((news) => {
      res.status(200).json({ error: false, message: "success", news });
    })
    .catch((err) => {
      res.status(404).json({ error: true, message: err });
    });
});
// create
router.post("/api/news", [upload.single("picture"), auth], (req, res) => {
  cloudinary.uploader
    .upload(req.file.path)
    .then((result) => {
      const { title, contents, writter } = req.body;
      const news = new News({
        title,
        contents,
        writter,
        picture: result.secure_url,
        cloudinary_id: result.public_id,
      });
      news
        .save()
        .then((resultNews) => {
          res.status(201).json({ message: "News berhasil disimpan" });
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
router.get("/api/news/:id", auth, (req, res) => {
  News.findOne({ _id: req.params.id }).exec((err, news) => {
    if (err || !news) {
      res.status(404).json({ message: "News tidak ditemukan", error: true });
    }
    res.status(200).json({ error: false, message: "success", news });
  });
});

//update
router.put("/api/news/:id", [auth, upload.single("picture")], (req, res) => {
  News.findById(req.params.id)
    .then((news) => {
      res.json(news);
      cloudinary.uploader.destroy(news.cloudinary_id);
      if (req.file) {
        cloudinary.uploader
          .upload(req.file.path)
          .then((result) => {
            const data = {
              title: req.body.title || news.title,
              contents: req.body.contents || news.contents,
              writter: req.body.writter || news.writter,
              picture: result?.secure_url || news.picture,
              cloudinary_id: result?.public_id || news.cloudinary_id,
            };

            News.findByIdAndUpdate(req.params.id, data, { new: true })
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
      } else {
        News.findByIdAndUpdate(req.params.id, req.body, { new: true })
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
router.delete("/api/news/:id", auth, (req, res) => {
  News.findByIdAndRemove({ _id: req.params.id }).exec((err, news) => {
    if (news) {
      cloudinary.uploader.destroy(news.cloudinary_id);
      return res.status(200).json({ message: "Berhasil dihapus" });
    }
    res.send(404).json({ error: "News tidak ditemukan" });
  });
});
module.exports = router;
