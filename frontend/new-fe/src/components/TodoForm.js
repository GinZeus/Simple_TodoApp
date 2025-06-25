import React, { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";

const TodoForm = ({ initialData = null, onSubmit }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    due_date: "",
    completed: false,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      const formatDate = (dateStr) => {
        if (!dateStr) return "";
        return new Date(dateStr).toISOString().split("T")[0];
      };

      setForm({
        title: initialData.title || "",
        description: initialData.description || "",
        due_date: formatDate(initialData.due_date),
        completed: initialData.completed || false,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.due_date) newErrors.due_date = "Due date is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit(form);
  };

  return (
    <Card className="p-4 shadow-sm">
      <Form onSubmit={handleSubmit} noValidate>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter title"
            isInvalid={!!errors.title}
          />
          <Form.Control.Feedback type="invalid">
            {errors.title}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter description"
            rows={3}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Due Date</Form.Label>
          <Form.Control
            type="date"
            name="due_date"
            value={form.due_date}
            onChange={handleChange}
            isInvalid={!!errors.due_date}
          />
          <Form.Control.Feedback type="invalid">
            {errors.due_date}
          </Form.Control.Feedback>
        </Form.Group>

        {initialData && (
          <Form.Check
            className="mb-3"
            type="checkbox"
            label="Completed"
            name="completed"
            checked={form.completed}
            onChange={handleChange}
          />
        )}

        <Button type="submit" variant="primary">
          {initialData ? "Update Todo" : "Add Todo"}
        </Button>
      </Form>
    </Card>
  );
};

export default TodoForm;
