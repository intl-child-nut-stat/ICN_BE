
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('children').del()
    .then(function () {
      // Inserts seed entries
      return knex('children').insert([
        { name: 'Manju KC', community_id: 1},
        { name: 'Jessi James', community_id: 1},
        { name: 'Ash Smith', community_id: 3},
        { name: 'Joe Biden', community_id: 1},
        { name: 'Obama mama', community_id: 2}
      ]);
    });
};
