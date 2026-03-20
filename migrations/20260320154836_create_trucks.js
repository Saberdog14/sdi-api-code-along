/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex
    .raw("CREATE TYPE truck_status as ENUM('open', 'closed', 'orbiting')")
    .then(() => {
      return knex.schema.createTable("trucks", (table) => {
        table.increments("id");
        table.string("name").notNullable();
        table.string("cuisine").notNullable();
        table.text("description");
        table.decimal("rating", 3, 2).defaultTo(0);
        table.integer("planet_id").unsigned().notNullable();
        table.integer("owner_id").unsigned().notNullable();

        //Enumerator
        table
          .enu("status", null, {
            useNative: true,
            existingType: true,
            enumName: "truck_status",
          })
          .defaultTo("orbiting");

        table
          .foreign("planet_id")
          .references("id")
          .inTable("planets")
          .onDelete("CASCADE");

        table
          .foreign("owner_id")
          .references("id")
          .inTable("users")
          .onDelete("CASCADE");
      });
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("trucks")
    .then(() => knex.raw("DROP TYPE IF EXISTS truck_status"));
};
