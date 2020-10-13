const knex = require("knex")({
  client: "pg",
  connection: {
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: "localhost",
    database: process.env.DATABASE,
  },
});

module.exports = knex;
