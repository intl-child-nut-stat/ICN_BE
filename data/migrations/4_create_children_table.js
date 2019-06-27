exports.up = function(knex, Promise) {
  return knex.schema.createTable("children", tbl => {
    tbl.increments();

    tbl.string("name", 128).notNullable();
    tbl
      .integer("community_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("community")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("children");
};
