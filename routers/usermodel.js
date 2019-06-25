const db = require('../data/dbconfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
};

function find() {
  return db('user').select('id', 'username', 'password', 'isAdmin', 'country_id');
}

function findBy(filter) {
  return db('user').where(filter);
}

async function add(user) {
  console.log('I am user', user)
  const [id] = await db('user').returning('id').insert(user);
  console.log('i am id', id)
  return findById(id);
}

function findById(id) {
  return db('user')
    .where({ id });
}

