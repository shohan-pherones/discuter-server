const express = require("express");
const {
  registerUser,
  loginUser,
  findUser,
  getUsers,
} = require("../controllers/userController");

// creating router
const router = express.Router();

// routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/find/:userId", findUser);
router.get("/", getUsers);

module.exports = router;
