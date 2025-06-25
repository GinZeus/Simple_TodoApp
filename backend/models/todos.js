const db = require("../db");

const Todos = {
  getAll: () => db("todos"),
  getById: (id) => db("todos").where({ id }).first(),
  create: (todo) => db("todos").insert(todo),
  update: (id, todo) => db("todos").where({ id }).update(todo),
  remove: (id) => db("todos").where({ id }).del(),
};

module.exports = Todos;
