exports.seed = function(knex, Promise) {
    return knex('user')
      .del() // delete all user's
      .then(function() {
        return knex('user').insert([
          {
            username: 'superuser',
            password: "9@=`e[[*5z$/2'R",
            isAdmin: true,
            country_id: 1
          }
        ]);
      });
  }