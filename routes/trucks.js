const db = require("../db/db");
const express = require("express");

const router = express();

router.get("/", async (req, res) => {
  try {
    const result = await db("trucks").select("*");
    return res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ message: "Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db("trucks").select("*").where({ id });
    return res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ message: "Server Error" });
  }
});

module.exports = router;
