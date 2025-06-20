const express = require("express");
const router = express.Router();
const User = require("../models/user");

// ✅ Updated Signup Route
router.post("/signup", async (req, res) => {
  const { name, email, phone, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: "User already exists" });

  const newUser = new User({ name, email, phone, password });
  await newUser.save();
  res.status(201).json({ message: "User registered successfully" });
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  res.status(200).json({ message: "Login successful" });
});

module.exports = router;
