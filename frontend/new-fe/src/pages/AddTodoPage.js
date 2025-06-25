import React from "react";
import TodoForm from "../components/TodoForm";
import { useNavigate } from "react-router-dom";
import * as todoService from "../services/todoService";

const AddTodoPage = () => {
  const navigate = useNavigate();

  const handleAdd = async (todo) => {
    await todoService.createTodo(todo);
    navigate("/todos");
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Add New Todo</h3>
      <TodoForm onSubmit={handleAdd} />
    </div>
  );
};

export default AddTodoPage;
