const express = require("express");

const router = express.Router();

const mongoose = require("mongoose");

const requireLogin = require("../middleware/requireLogin");

const Post = mongoose.model("Post");

router.get("/allpost",(req, res) => {
  Post.find()
    .populate("postedBy", "_id,name")
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => {
      console.log(err.message);
    });
});

router.post("/createpost",  (req, res) => {
  const { title, body ,pic} = req.body;
  if (!title || !body || !pic) {
    return res.status(422).json({ err: "Please add all field" });
  }
  const post = new Post({
    title,
    body,
    photo:pic,
    postedBy: req.user,
  });

  post
    .save()
    .then((result) => {
      res.json({ post: result });
    })
    .catch((err) => {
      console.log("++++++++++++++++++", err);
    });
});

router.get("/mypost", requireLogin, (req, res) => {
  Post.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name")
    .then((mypost) => {
      res.json({ mypost });
    })
    .catch((err) => {
      console.log(err.message);
    });
});

module.exports = router;
