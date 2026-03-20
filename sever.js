//Setup: run npm install express pg knex zod cookie-parser bcrypt dotenv cors
//npm install --save-dev @faker-js/faker
//npx knex init
//then edit knexfile
const db = require("./db/db");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const userRoutes = require("./routes/users");
const truckRoutes = require("./routes/trucks");

const port = 8080;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("This is the homepage");
});

app.get("/planets", async (req, res) => {
  try {
    const result = await db("planets").select("*");
    return res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ message: "Server Error" });
  }
});

app.get("/planets/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db("planets").select("*").where({ id });
    return res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ message: "Server Error" });
  }
});

app.use("/users", userRoutes);
// app.use('/auth', authRoutes)
app.use("/trucks", truckRoutes);
// app.use('/planets', planetRoutes)

app.listen(port, () =>
  console.log(`Server is listening at http://localhost:${port}`),
);
