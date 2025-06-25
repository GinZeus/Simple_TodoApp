import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TodoForm from "../components/TodoForm";
import * as todoService from "../services/todoService";

const EditTodoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    const fetchTodo = async () => {
      const res = await todoService.getTodo(id);
      setTodo(res.data.todo);
    };
    fetchTodo();
  }, [id]);

  const handleUpdate = async (updatedTodo) => {
    await todoService.updateTodo(id, updatedTodo);
    navigate("/todos");
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Edit Todo</h3>
      {todo && <TodoForm initialData={todo} onSubmit={handleUpdate} />}
    </div>
  );
};

export default EditTodoPage;
