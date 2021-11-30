const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const User = mongoose.model("User");

router.get("/api/user", auth, (req, res) => {
  User.find()
    // .select("+password")
    .then((user) => {
      res.json({ user });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/api/user/:id", auth, (req, res) => {
  User.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, data) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "terjadi kesalahan harap isi semua inputan" });
    }
    return res.status(201).json({ message: "Berhasil update.", data });
  });

  router.delete("/api/user/:id", auth, (req, res) => {
    User.findOne({ _id: req.params.id }).exec((err, user) => {
      if (err || !user) {
        return res.status(422).json({ error: err });
      }
      if (user._id.toString() === req.user._id.toString()) {
        user
          .remove()
          .then((result) => {
            res.send(201).json({ message: "Berhasil dihapus", result });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  });
  // .then((user) => {
  //   res.json({ user });
  // })
  // .catch((err) => {
  //   return res.status(404).json({ error: "User Not Found" });
  // });
});
// router.put("/follow", requireLogin, (req, res) => {
//   User.findByIdAndUpdate(
//     req.body.followId,
//     { $push: { followers: req.user._id } },
//     { new: true },
//     (err, result) => {
//       if (err) {
//         return res.status(422).json({ error: err });
//       }
//       User.findByIdAndUpdate(
//         req.user._id,
//         {
//           $push: { following: req.body.followId },
//         },
//         { new: true }
//       )
//         .select("-password")
//         .then((result) => {
//           res.json(result);
//         })
//         .catch((err) => {
//           return res.status(422).json({ error: err });
//         });
//     }
//   );
// });
// router.put("/unfollow", requireLogin, (req, res) => {
//   User.findByIdAndUpdate(
//     req.body.unfollowId,
//     {
//       $pull: { followers: req.user._id },
//     },
//     {
//       new: true,
//     },
//     (err, result) => {
//       if (err) {
//         return res.status(422).json({ error: err });
//       }
//       User.findByIdAndUpdate(
//         req.user._id,
//         {
//           $pull: { following: req.body.unfollowId },
//         },
//         { new: true }
//       )
//         .select("-password")
//         .then((result) => {
//           res.json(result);
//         })
//         .catch((err) => {
//           return res.status(422).json({ error: err });
//         });
//     }
//   );
// });
// router.put('/follow',requireLogin,(req,res) =>{
//     User.findByIdAndUpdate(req.body.followId,
//         {$push:{followers:req.user._id}},
//         {new:true},
//         (err,result) => {
//             if(err){
//                 return res.status(422).json({error:err})
//             }
//             User.findByIdAndUpdate(req.body.user_id,
//             {$push:{following:req.body.followId}},
//             {new:true}).select("-password")
//             .then(result=>{
//                 res.json(result)
//             }).catch(err=>{
//                 return res.status(422).json({error:err})
//             })
//         }

//     )

// })
// router.put('/unfollow',requireLogin,(req,res) =>{
//     User.findByIdAndUpdate(req.body.unfollowId,
//         {$pull:{followers:req.user._id}},
//         {new:true},
//         (err,result) => {
//             if(err){
//                 return res.status(422).json({error:err})
//             }
//             User.findByIdAndUpdate(req.body.user_id,
//             {$pull:{following:req.body.unfollowId}},
//             {new:true}).select("-password")
//             .then(result=>{
//                 res.json(result)
//             }).catch(err=>{
//                 return res.status(422).json({error:err})
//             })
//         }

//     )

// })

module.exports = router;
