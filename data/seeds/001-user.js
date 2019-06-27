exports.seed = function(knex, Promise) {
  return knex("user")
    .del()
    .then(function() {
      return knex("user").insert([
        { username: "Fredo", password: "test", country_id: 1 },

        { username: "Olivia", password: "test", isAdmin: "false" }
      ]);
    });
};
