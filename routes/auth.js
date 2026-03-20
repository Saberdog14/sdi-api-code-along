const express = require("express");
const router = express();
const { registerUser, login } = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", login);

module.exports = router;
