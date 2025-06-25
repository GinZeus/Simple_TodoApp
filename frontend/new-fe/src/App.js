import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import TodosPage from "./pages/TodosPage";
import AddTodoPage from "./pages/AddTodoPage";
import EditTodoPage from "./pages/EditTodoPage";
import { TodoProvider } from "./context/TodoContext";

function App() {
  return (
    <TodoProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/todos" />} />
          <Route path="/todos" element={<TodosPage />} />
          <Route path="/todos/new" element={<AddTodoPage />} />
          <Route path="/todos/:id" element={<EditTodoPage />} />
        </Routes>
      </Router>
    </TodoProvider>
  );
}

export default App;
