import React, { useContext, useState, useEffect } from "react";
import { TodoContext } from "../context/TodoContext";
import { useNavigate } from "react-router-dom";
import * as todoService from "../services/todoService";
import { Button, Card, Badge, ButtonGroup } from "react-bootstrap";

const TodosPage = () => {
  const { todos, fetchTodos } = useContext(TodoContext);

  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");

  const handleDelete = async (id) => {
    await todoService.deleteTodo(id);
  };

  useEffect(() => {
    fetchTodos();
  }, [todos]);
  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "incomplete") return !todo.completed;
    return true;
  });

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-bold">Todo List</h3>
        <Button variant="success" onClick={() => navigate("/todos/new")}>
          + Add Todo
        </Button>
      </div>

      <ButtonGroup className="mb-3">
        <Button
          variant={filter === "all" ? "primary" : "outline-primary"}
          onClick={() => setFilter("all")}
        >
          All
        </Button>
        <Button
          variant={filter === "completed" ? "primary" : "outline-primary"}
          onClick={() => setFilter("completed")}
        >
          Completed
        </Button>
        <Button
          variant={filter === "incomplete" ? "primary" : "outline-primary"}
          onClick={() => setFilter("incomplete")}
        >
          Incomplete
        </Button>
      </ButtonGroup>

      <div className="row">
        {filteredTodos.map((todo) => (
          <div key={todo.id} className="col-md-6 col-lg-4 mb-4">
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title className="d-flex justify-content-between">
                  {todo.title}
                  {todo.completed ? (
                    <Badge bg="success">Done</Badge>
                  ) : (
                    <Badge bg="warning" text="dark">
                      Pending
                    </Badge>
                  )}
                </Card.Title>
                <Card.Text>{todo.description}</Card.Text>
                <div className="d-flex justify-content-end gap-2">
                  <Button
                    size="sm"
                    variant="outline-primary"
                    onClick={() => navigate(`/todos/${todo.id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => handleDelete(todo.id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodosPage;
