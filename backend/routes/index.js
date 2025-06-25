const express = require("express");
const router = express.Router();
const todos = require("../controllers/todos");

router.get("/todos", todos.getTodos);
router.get("/todos/:id", todos.getTodo);
router.post("/todos", todos.createTodo);
router.put("/todos/:id", todos.updateTodo);
router.delete("/todos/:id", todos.deleteTodo);

module.exports = router;
