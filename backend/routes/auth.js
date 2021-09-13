const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleWare/fetchuser");
const { body, validationResult } = require("express-validator");
//Our signature on token to verify it is not modified
const JWT_SECRET = "iams@ng@m";

// 🚀 Route 1: Create a user -> using: POST "/api/auth/createUser" --> No Login required <--
router.post(
  "/createUser", //Choosing the area where we want to do things
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid EmailId").isEmail(),
    body("password", "Password must be at least 6 Characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    //making the function async()
    let success = false;
    // If there are errors return Bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    //Check wether user with this email exists already
    //Putting everything under try{} so if anything goes wrong we can use catch() in last to display errors
    try {
      let user = await User.findOne({ email: req.body.email });

      //We imported user.js so we can check if user exist or not
      if (user) {
        return res
          .status(400)
          .json({ success, error: "Sorry user with this email already exists" });
      }

      //generating secure password using hash and salt
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      //If user not exists we will open the gate for user and create his identity in DataBase
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken }); // we will send this always at the last -> actually this is the respose we are going to get when we send post or get request
    } catch (error) {
      console.log(error.message);
      res.status(500).send("some error occured");
    }
  }
);

// 🚀 Route 2 : Authenticate a user -> using: POST "/api/auth/login" --> No Login required <--
router.post(
  "/login", //Choosing the area where we want to do things
  [
    body("email", "Enter a valid EmailId").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    //making the function async()
    let success = false;
    // If there are errors return Bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    //Using destructing to extract thing we require
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email }); // checking user exist or not
      if (!user) {
        return res
          .status(400)
          .json({ success, error: "Please try to log in with correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ success, error: "Please try to log in with correct credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken }); // we will send this always at the last -> actually this is the respose we are going to get when we send post or get request
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// 🚀 Route 3 : Get loggedIn user -> detail : POST "/api/auth/getuser" --> Login required <--
router.post(
  "/getuser",
  fetchuser, //Choosing the End Point where we want to do things
  async (req, res) => {
    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
    } catch (error) {
      console.log(error.message);
      res.status(401).send("Internal Server Error");
    }
  }
);

module.exports = router;
