exports.seed = function(knex, Promise) {
  return knex("country")
    .del()
    .then(function() {
      return knex("country").insert([
        { country: "Japan" },
        { country: "Argentina" },
        { country: "Angola" }
      ]);
    });
};
