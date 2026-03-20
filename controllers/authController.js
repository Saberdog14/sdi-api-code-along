const { GitModule } = require("@faker-js/faker");
const db = require("../db/db");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

const createUser = async (user) => {
  return db("users").insert(user).returning(["id", "username", "role"]);
};

const registerUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const exists = await db("users").where({ username }).first();
    if (exists) {
      return res.status(400).json({ message: "User does exist" });
    }

    const hashWord = bcrypt.hash(password, SALT_ROUNDS);

    const newUser = await createUser({
      username,
      password: hashWord,
      role: role || "user",
    });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await db("users").where({ username }).first();
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const matches = await bcrypt.compare(password, user.password);
    if (!matches) {
      return res.status(500).json({ message: "Your shit's wrong goober" });
    }
    res.cookie("user", {
      id: user.id,
      username: user.username,
      role: user.role,
    });
    res.status(200).json({
      message: "You logged in successfully",
      user: { username: user.username, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { registerUser, login };
