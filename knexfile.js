// Update with your config settings.
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/th.db3',
    },
    useNullAsDefault: true,
    migrations:{ 
      directory: './data/migrations'
    },
    seeds:{
      directory:'./data/seeds'
    }
  },

  // staging: {
  //   client: 'pg',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 1,
      max: 10
    },
    migrations: {
      directory: './data/migrations',
      tableName: 'knex_migrations'
    },
    seeds:{
      directory:'./data/seeds'
    },
    useNullAsDefault: true
  }

};
