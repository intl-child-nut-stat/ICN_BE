// Update with your config settings.
require('dotenv').config();

const DATABASE_URL = process.env.DATABASE_URL
let d = {
  'user' : 1,
  'password': 2,
  'host': 3,
  'port': 4,
  'database': 5
}
let re = /postgres\:\/\/(\w+)\:([a-z0-9]+)@([^:]+)\:(\d+)\/(\w+)/g
let a = re.exec(DATABASE_URL)

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/icn.db3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },
  
  testing: {
    client: 'sqlite3',
    connection: {
      filename: './data/test.db3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },

  production: {
    client: 'pg',
    connection: {
      user: a[d.user],
      password: a[d.password],
      database: a[d.database],
      host: a[d.host],
      port: a[d.port],
      ssl: true
    },
    searchPath: ['knex', 'public'],
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds'
    }
  }
};
