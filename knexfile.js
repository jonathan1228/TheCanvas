// Update with your config settings.

module.exports = {

  development: {
     client: 'postgresql',
    connection: {
      host: 'localhost',
      database: 'instagram'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'instagram',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'instagram',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
