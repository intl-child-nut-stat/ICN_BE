exports.seed = function(knex, Promise) {
    return knex('country')
      .del() // delete all countries's
      .then(function() {
        return knex('country').insert([
          {
            country: 'USA'
          }
        ]);
      });
  }