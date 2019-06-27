
exports.up = function(knex, Promise) {
    return knex.schema
    .createTable("community", tbl => {
      tbl.increments();
      
      tbl
        .string("community", 128)
        .notNullable()

    tbl
    .integer('country_id')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('country')
    .onDelete('CASCADE')
    .onUpdate('CASCADE');
    })

  };



exports.down = function(knex, Promise) {
return knex.schema.dropTableIfExists('community');
};

