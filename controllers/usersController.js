const db = require("../db/db");

const getAll = async (req, res) => {
  try {
    const result = await db("users").select("*");
    return res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ message: "Server Error" });
  }
};

const getAllById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await db("users").where({ id });
    return res.status(200).json(user);
  } catch (err) {
    res.status(500).send({ message: "Server Error" });
  }
};

module.exports = { getAll, getAllById };
