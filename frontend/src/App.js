// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentList from "./components/StudentList";
import StudentForm from "./components/StudentForm";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="container">
        <h1 className="header1">Student Management</h1>
        <Routes>
          <Route path="/" element={<StudentList />} />
          <Route path="/create" element={<StudentForm />} />
          <Route path="/edit/:id" element={<StudentForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
