/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("planets", (table) => {
    table.increments("id");
    table.string("name").unique().notNullable();
    table.string("atmosphere");
    table.integer("population");
    table.text("description");
    table.integer("discovered_by").unsigned();

    table
      .foreign("discovered_by")
      .references("id")
      .inTable("users")
      .onDelete("SET NULL");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("planets");
};
