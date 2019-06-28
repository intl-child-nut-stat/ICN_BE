
exports.seed = function(knex, Promise) {
 
  return knex('community').del()
    .then(function () {
      return knex('community').insert([
        {community:"yokohama", country_id:1},
        {community:"sangai", country_id:2},
        {community:"saringo", country_id:3}
      ]);
    });
};
