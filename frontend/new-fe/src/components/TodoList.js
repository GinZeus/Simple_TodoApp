import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ todos, onDelete, onUpdate }) => {
  return (
    <ul className="list-group">
      {Array.isArray(todos) &&
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))}
    </ul>
  );
};

export default TodoList;
