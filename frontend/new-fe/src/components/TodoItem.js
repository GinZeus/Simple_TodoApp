import React, { useState } from "react";
import { Card, Button, Form, Badge } from "react-bootstrap";

const TodoItem = ({ todo, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    title: todo.title,
    description: todo.description,
    due_date: todo.due_date,
    completed: todo.completed,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = () => {
    onUpdate(todo.id, form);
    setIsEditing(false);
  };

  const formatDate = (date) => {
    try {
      return new Date(date).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "";
    }
  };

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        {isEditing ? (
          <>
            <Form.Control
              className="mb-2"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title"
            />
            <Form.Control
              className="mb-2"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
            />
            <Form.Control
              className="mb-2"
              type="date"
              name="due_date"
              value={form.due_date?.split("T")[0] || ""}
              onChange={handleChange}
            />
            <Form.Check
              className="mb-2"
              label="Completed"
              type="checkbox"
              name="completed"
              checked={form.completed}
              onChange={handleChange}
            />
            <div className="d-flex justify-content-end gap-2">
              <Button size="sm" variant="success" onClick={handleSave}>
                Save
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <Card.Title className="d-flex justify-content-between align-items-center">
              <span
                className={`${
                  todo.completed
                    ? "text-decoration-line-through text-muted"
                    : ""
                }`}
              >
                {todo.title}
              </span>
              <Badge
                bg={todo.completed ? "success" : "warning"}
                text={todo.completed ? "light" : "dark"}
              >
                {todo.completed ? "Done" : "Pending"}
              </Badge>
            </Card.Title>

            <Card.Text className="mb-1">{todo.description}</Card.Text>

            <Card.Text>
              <small className="text-muted">
                <strong>Due date:</strong>{" "}
                {todo.due_date ? formatDate(todo.due_date) : "Not set"}
              </small>
            </Card.Text>

            <div className="d-flex justify-content-end gap-2">
              <Button
                size="sm"
                variant="outline-primary"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </Button>
              <Button
                size="sm"
                variant="outline-danger"
                onClick={() => onDelete(todo.id)}
              >
                Delete
              </Button>
            </div>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default TodoItem;
