const knex = require('knex');

module.exports = knex({
    client: 'postgres',
    connection: {
        host: process.env.PG_HOST,
        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        database: process.env.PG_DB
    }
})