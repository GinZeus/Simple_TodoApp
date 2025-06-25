const Todos = require("../models/todos");
const createError = require("http-errors");

module.exports = {
  getTodos: async (req, res, next) => {
    try {
      const data = await Todos.getAll();
      res.json({ data });
    } catch (error) {
      next(error);
    }
  },
  getTodo: async (req, res, next) => {
    try {
      const { id } = req.params;
      const todo = await Todos.getById(id);
      if (!todo) throw createError.NotFound("Task not found");
      res.json({ todo });
    } catch (error) {
      next(error);
    }
  },
  createTodo: async (req, res, next) => {
    try {
      const { title, description, due_date } = req.body;
      if (!title) throw createError.BadRequest("Missing required fields");

      await Todos.create({ title, description, due_date, completed: false });
      res.status(201).json({ message: "Created task successfully" });
    } catch (error) {
      next(error);
    }
  },
  updateTodo: async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const todo = await Todos.getById(id);
      if (!todo) throw createError.NotFound("Task not found");

      await Todos.update(id, data);
      res.json({ message: "Updated task successfully" });
    } catch (error) {
      next(error);
    }
  },
  deleteTodo: async (req, res, next) => {
    try {
      const { id } = req.params;
      const todo = await Todos.getById(id);
      if (!todo) throw createError.NotFound("Task not found");

      await Todos.remove(id);
      res.json({ message: "Deleted task successfully" });
    } catch (error) {
      next(error);
    }
  },
};
