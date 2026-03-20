const { faker } = require("@faker-js/faker");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("planets").del();
  await knex.raw("ALTER SEQUENCE planets_id_seq RESTART WITH 1");

  const planets = Array.from({ length: 10 }, () => ({
    name:
      faker.science.chemicalElement().name +
      "-" +
      faker.number.int({ min: 1, max: 999 }),
    atmosphere: faker.word.adjective(),
    population: faker.number.int({ min: 1000, max: 10000000 }),
    description: faker.lorem.sentence(),
    discovered_by: faker.number.int({ min: 1, max: 10 }),
  }));

  await knex("planets").insert(planets);
};
