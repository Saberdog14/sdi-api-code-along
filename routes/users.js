const express = require("express");
const router = express();
const { getAll, getAllById } = require("../controllers/usersController");

router.get("/", getAll);
router.get("/:id", getAllById);

module.exports = router;
