// const knex = require('knex') ({
//     client: 'mysql2',
//     // debug: true,
//     connection: {
//         host: '104.161.49.14',
//         port: 28138,
//         user: 'levtest',
//         password: 'Levcloud2025@@',
//         database: 'Lev_test_db'
//     }
// })

// module.exports = knex

const knex = require("knex");

const db = knex({
  client: "mysql2",
  connection: {
    host: "localhost",
    user: "root",
    password: "123456",
    database: "lev_todos",
  },
});

module.exports = db;
