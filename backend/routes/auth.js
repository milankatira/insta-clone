const express = require("express");

const router = express.Router();

const mongoose = require("mongoose");

const User = mongoose.model("User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const { JWT_KEY } = require("../keys");

const requireLogin = require("../middleware/requireLogin");

router.get("/protected", requireLogin, (req, res) => {
  res.send("hello user");
});

router.get("/", (req, res) => {
  res.send("hello");
});

router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(422).json({ error: "error please enter all field" });
  }
  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res
          .status(422)
          .json({ error: "user alreaady exist with that email" });
      } else {
        bcrypt.hash(password, 12).then((hashedpassword) => {
          const user = new User({
            name,
            email,
            password: hashedpassword,
          });
          user
            .save()
            .then((user) => {
              res.json({ message: "saved successfully" });
            })
            .catch((err) => {
              console.log(err);
            });
        });
      }
    })
    .catch((err) => {
      console.log("---------------------------------", err);
    });
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "please add email or password" });
  }
  User.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: "invalid email or password" });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((doMatch) => {
        if (doMatch) {
          const token = jwt.sign({ _id: savedUser._id }, JWT_KEY);
          const { _id, name, email } = savedUser
          res.json({ token, user: { _id, name, email } });
          res.json({ message: "sign in sucessfully" });
        } else {
          return res.status(422).json({ error: "invalid email & password" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
module.exports = router;
