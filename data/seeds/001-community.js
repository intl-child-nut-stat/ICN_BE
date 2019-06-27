
exports.seed = function(knex, Promise) {
  return knex('community').del()
    .then(function () {
     
      return knex('community').insert([
        {community:"Yokohama", country_id:1},
        {community:"Rosario", country_id:2},
        {community:"Andulo", country_id:3}
      ]);
    });
};
