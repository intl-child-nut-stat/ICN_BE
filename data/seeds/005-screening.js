
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('screening').del()
    .then(function () {
      // Inserts seed entries
      return knex('screening').insert([
        { date: '02/02/2015', age: 4, height: 12, weight: 17, children_id: 1},
        { date: '02/02/2016', age: 14, height: 14, weight: 17, children_id: 1},
        { date: '02/02/2014', age: 24, height: 12, weight: 17, children_id: 3},
        { date: '02/02/2016', age: 6, height: 15, weight: 17, children_id: 2,
        { date: '02/02/2017', age: 7, height: 12, weight: 17, children_id: 1},
        { date: '02/02/2018', age: 21, height: 12, weight: 17, children_id: 3},
        { date: '02/02/2019', age: 11, height: 16, weight: 17, children_id: 1},
        { date: '02/02/2014', age: 20, height: 1, weight: 17, children_id: 3},
        { date: '02/02/2013', age: 17, height: 12, weight: 17, children_id: 1},
      ]);
    });
};
