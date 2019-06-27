exports.up = function(knex, Promise) {
  return knex.schema.createTable("screening", tbl => {
    tbl.increments();

    tbl.date("date", 128).notNullable();
    tbl.integer("age", 128).notNullable();
    tbl.float("height", 128).notNullable();
    tbl.float("weight", 128).notNullable();

    tbl
      .integer("children_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("community")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("screening");
};
