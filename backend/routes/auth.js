const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  login,
  register,
  updateProfile,
  getProfile,
  logout,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", authMiddleware, logout);
router.put("/profile", authMiddleware, updateProfile);
router.get("/profile", authMiddleware, getProfile);

module.exports = router;
