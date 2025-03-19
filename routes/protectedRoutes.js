const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User"); // Імпорт моделі користувача
const router = express.Router();

// Захищений маршрут для профілю
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password -__v"); // Виключаємо чутливі дані
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});
router.put("/profile", authMiddleware, async (req, res) => {
  const { username, email } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { username, email },
      { new: true, runValidators: true }
    ).select("-password -__v");
    res.json(updatedUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});
router.get("/admin", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "Access denied" });
  }
  res.json({ msg: "Welcome, Admin!" });
});

module.exports = router;
