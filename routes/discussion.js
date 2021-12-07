const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const Discussion = mongoose.model("Discussion");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
// find all
router.get("/api/discussion", auth, (req, res) => {
  Discussion.find()
    .populate("user_id", "_id s")
    .then((discussion) => {
      res.status(200).json({ error: false, message: "success", discussion });
    })
    .catch((err) => {
      res.status(404).json({ error: true, message: err });
    });
});
// create
router.post("/api/discussion", [upload.single("picture"), auth], (req, res) => {
  cloudinary.uploader
    .upload(req.file.path)
    .then((result) => {
      const { title, description } = req.body;
      const discussion = new Discussion({
        title,
        description,
        user_id: req.user._id,
        picture: result.secure_url,
        cloudinary_id: result.public_id,
      });
      discussion
        .save()
        .then((discussion) => {
          res.status(201).json({ message: "discussion berhasil disimpan" });
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
router.get("/api/discussion/:id", auth, (req, res) => {
  Discussion.findOne({ _id: req.params.id }).exec((err, discussion) => {
    if (err || !discussion) {
      res
        .status(404)
        .json({ message: " discussion tidak ditemukan", error: true });
    }
    res.status(200).json({ error: false, message: "success", discussion });
  });
});
// comment discussion
// router.put("/api/discussion/comment/:id", auth, (req, res) => {
//   const comment = {
//     text: req.body.text,
//     user_id: req.user._id,
//   };
//   Discussion.findByIdAndUpdate(
//     req.params.id,
//     { $push: { comments: comment } },
//     { new: true }
//   ).exec((err, result) => {
//     if (err) {
//       res.status(422).json({ error: "error" });
//     } else {
//       res.status(201).json({ message: "berhasil", result });
//     }
//   });
// });
// // delete comment discussion
// router.put("/api/discussion/comment/delete/:id", auth, (req, res) => {

//   Discussion.findByIdAndUpdate(
//     req.params.id,
//     { $unset: { comments: comments._id } },
//     { new: true }
//   ).exec((err, result) => {
//     if (err) {
//       return res.status(422).json({ error: "error" });
//     } else {
//       res.status(201).json({ message: "berhasil", result });
//     }
//   });
// });

//update
router.put(
  "/api/discussion/:id",
  [upload.single("picture"), auth],
  (req, res) => {
    Discussion.findById(req.params.id)
      .then((discussion) => {
        //jika ada request file
        if (req.file) {
          cloudinary.uploader.destroy(discussion.cloudinary_id);
          cloudinary.uploader
            .upload(req.file.path)
            .then((result) => {
              const data = {
                title: req.body.title || discussion.title,
                description: req.body.description || discussion.description,
                picture: result?.secure_url,
                cloudinary_id: result?.public_id,
              };

              Discussion.findByIdAndUpdate(req.params.id, data, {
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
            title: req.body.title || discussion.title,
            description: req.body.description || discussion.description,
            picture: discussion.picture,
            cloudinary_id: discussion.cloudinary_id,
          };
          Discussion.findByIdAndUpdate(req.params.id, oldData, {
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
router.delete("/api/discussion/:id", auth, (req, res) => {
  Discussion.findOne({ _id: req.params.id }).exec((err, discussion) => {
    if (err || !discussion) {
      return res.status(422).json({ message: "Tidak ditemukan" });
    }
    // if (discussion.user_id._id.toString() === req.user._id.toString()) {
    cloudinary.uploader.destroy(discussion.cloudinary_id);
    discussion
      .remove()
      .then((result) => {
        res.json({ message: "berhasil dihapus" });
      })
      .catch((err) => {
        res.json({ message: "error" });
      });
    // }
  });
});
module.exports = router;
