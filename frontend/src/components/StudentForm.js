// src/components/StudentForm.js
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function StudentForm() {
  const [student, setStudent] = useState({
    studentId: "",
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    department: "",
    enrollmentYear: "",
    isActive: false,
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get("https://student-management-system1-3huu.onrender.com/api/products")
        .then((res) => {
          const existingStudent = res.data.data.find((s) => s._id === id);
          if (existingStudent) {
            setStudent(existingStudent);
          }
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setStudent((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await axios.put(`https://student-management-system1-3huu.onrender.com/api/products/${id}`, student);
    } else {
      await axios.post("https://student-management-system1-3huu.onrender.com/api/products", student);
    }
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <input name="studentId" placeholder="Student ID" value={student.studentId} onChange={handleChange} required />
      <input name="firstName" placeholder="First Name" value={student.firstName} onChange={handleChange} required />
      <input name="lastName" placeholder="Last Name" value={student.lastName} onChange={handleChange} required />
      <input name="email" placeholder="Email" value={student.email} onChange={handleChange} required />
      <input name="dob" type="date" placeholder="DOB" value={student.dob} onChange={handleChange} required />
      <input name="department" placeholder="Department" value={student.department} onChange={handleChange} required />
      <input name="enrollmentYear" type="number" placeholder="Enrollment Year" value={student.enrollmentYear} onChange={handleChange} required />
      <label>
        Active:
        <input type="checkbox" name="isActive" checked={student.isActive} onChange={handleChange} />
      </label>
      <button type="submit" className="btn">{id ? "Update" : "Create"}</button>
    </form>
  );
}

export default StudentForm;
