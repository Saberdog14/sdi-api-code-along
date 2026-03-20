const { faker } = require("@faker-js/faker");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("trucks").del();
  await knex.raw("ALTER SEQUENCE trucks_id_seq RESTART WITH 1");

  const statuses = ["open", "closed", "orbiting"];

  const trucks = Array.from({ length: 20 }, () => ({
    name: faker.company.name() + "'s " + faker.food.dish(),
    cuisine: faker.food.ethnicCategory(),
    description: faker.lorem.sentence(),
    rating: faker.number.float({ min: 1, max: 10, multipleOf: 0.01 }),
    planet_id: faker.number.int({ min: 1, max: 10 }),
    owner_id: faker.number.int({ min: 1, max: 10 }),
    status: faker.helpers.arrayElement(statuses),
  }));

  await knex("trucks").insert(trucks);
};
