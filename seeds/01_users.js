const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const createUsers = async (num) => {
  const hashWord = await bcrypt.hash("abc123", 10);
  let temp = [];
  for (let i = 0; i < num; i++) {
    temp.push({
      username: faker.internet.username(),
      password: hashWord,
      role: "user",
    });
    return temp;
  }
};
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();

  await knex.raw("ALTER SEQUENCE users_id_seq RESTART WITH 1");

  await knex("users").insert([
    { username: "admin", password: bcrypt.hash("password", 10), role: "admin" },
    // ...Array.from({ length: 10 }, () => ({
    //   username: faker.internet.username(),
    //   password: hashWord,
    //   role: "user",
    // })),
    ...(await createUsers(10)),
  ]);
};
